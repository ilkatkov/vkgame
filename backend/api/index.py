from contextlib import asynccontextmanager
from fastapi import FastAPI, HTTPException
from .models import *
from prisma import Prisma
import prisma.errors


db = Prisma()


@asynccontextmanager
async def lifespan(app: FastAPI):
    await db.connect()
    yield
    await db.disconnect()


app = FastAPI(lifespan=lifespan)


@app.post("/user/{user_id}")
async def create_user(user_id: int) -> prisma.models.User:
    user = await db.user.upsert(
        where={"id": user_id},
        data={
            "create": {
                "id": user_id,
            },
            "update": {},
        },
    )
    return user


@app.get("/user/{user_id}/games")
async def get_owned_games(user_id: int) -> list[prisma.models.Game]:
    games = await db.game.find_many(where={"ownerId": user_id})
    return games


@app.get("/game/{game_id}")
async def get_game(game_id: int) -> prisma.models.Game:
    game = await db.game.find_unique(
        where={
            "id": game_id,
        },
        include={
            "cards": True,
            "theme": True,
        },
    )

    if game is None:
        raise HTTPException(
            status_code=404, detail="No record matching the given input could be found"
        )

    return game


@app.post("/game", status_code=201)
async def create_game(request: PostGameRequestModel) -> prisma.models.Game:
    try:
        game = await db.game.create(
            {
                "gameType": request.game_type,
                "cards": {
                    "create": [
                        {
                            "name": card.name,
                            "description": card.description,
                            "imageSrc": card.image_src,
                        }
                        for card in request.cards
                    ]
                },
                "welcomeTitle": request.welcome_title,
                "welcomeDescription": request.welcome_description,
                "theme": (
                    {
                        "create": {
                            "fill_type": request.theme.fill_type,
                            "bg_color": request.theme.bg_color,
                            "bg_color_gradient": request.theme.bg_color_gradient,
                            "accent_color": request.theme.accent_color,
                        }
                    }
                    if request.theme is not None
                    else None
                ),
                "title": request.title,
                "icon": request.icon,
                "owner": {"connect": {"id": request.user_id}},
            }
        )
        return game

    except prisma.errors.MissingRequiredValueError as e:
        raise HTTPException(status_code=417, detail=str(e))


@app.delete("/game/{game_id}")
async def delete_game(game_id: int) -> DeleteGameResponseModel:
    n_del_cards = await db.card.delete_many(where={"gameId": game_id})
    del_game = await db.game.delete(where={"id": game_id})
    if del_game is None:
        raise HTTPException(status_code=404, detail="Could not find a record to delete")
    return {"cards_deleted": n_del_cards, "deleted_game": del_game}


@app.put("/game/{game_id}")
async def modify_game(
    game_id: int, request: ModifyGameRequestModel
) -> prisma.models.Game:
    query = {}
    if request.game_type:
        query["gameType"] = request.game_type
    if request.welcome_title:
        query["welcomeTitle"] = request.welcome_title
    if request.welcome_description:
        query["welcomeDescription"] = request.welcome_description
    if request.title:
        query["title"] = request.title
    if request.icon:
        query["icon"] = request.icon

    game = await db.game.update(where={"id": game_id}, data=query)
    if game is None:
        raise HTTPException(status_code=404, detail="No record could be found")
    return game


@app.post("/card")
async def create_card(request: CreateCardRequestModel) -> prisma.models.Card:
    card = await db.card.create(
        {
            "game": {"connect": {"id": request.game_id}},
            "name": request.name,
            "description": request.description,
            "imageSrc": request.image_src,
        }
    )
    return card
