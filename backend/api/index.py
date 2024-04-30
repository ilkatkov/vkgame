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


# User-realted methods


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


# Game-related methods


@app.get("/game/{game_id}")
async def get_game(game_id: int) -> prisma.models.Game:
    game = await db.game.find_unique(
        where={
            "id": game_id,
        },
        include={"classicCards": True, "matchCards": True},
    )

    if game is None:
        raise HTTPException(
            status_code=404, detail="No record matching the given input could be found"
        )

    return game


@app.post("/game", status_code=201)
async def create_game(request: CreateGameRequestModel) -> prisma.models.Game:
    game = await db.game.create(
        {
            "owner": {"connect": {"id": request.ownerId}},
            "logoURL": request.logoURL,
            "background": request.background,
            "welcomeTitle": request.welcomeTitle,
            "welcomeBody": request.welcomeBody,
            "subject": request.subject,
            "leaveTitle": request.leaveTitle,
            "leaveBody": request.leaveBody,
            "leaveURL": request.leaveURL,
            "gameType": request.gameType,
            "classicCards": {
                "create": [
                    {
                        "term": card.term,
                        "description": card.description,
                    }
                    for card in request.classicCards
                ]
            },
            "rounds": request.rounds,
            "matchCards": {
                "create": [
                    {
                        "imageURL": card.imageURL,
                        "name": card.name,
                        "description": card.description,
                    }
                    for card in request.matchCards
                ]
            },
        }
    )
    return game


@app.delete("/game/{game_id}")
async def delete_game(game_id: int) -> DeleteGameResponseModel:
    cardsDeleted = await db.classiccard.delete_many({"gameId": game_id})
    cardsDeleted += await db.matchcard.delete_many({"gameId": game_id})
    deletedGame = await db.game.delete({"id": game_id})
    if deletedGame is None:
        raise HTTPException(status_code=404, detail="Could not find a record to delete")
    return {"cardsDeleted": cardsDeleted, "deletedGame": deletedGame}


@app.put("/game/{game_id}")
async def modify_game(
    game_id: int, request: ModifyGameRequestModel
) -> prisma.models.Game:
    query = request.model_dump()
    keysToDelete = []
    for key in query:
        if not query[key]:
            keysToDelete.append(key)
    for key in keysToDelete:
        query.pop(key)
    game = await db.game.update(where={"id": game_id}, data=query)
    if game is None:
        raise HTTPException(status_code=404, detail="No record could be found")
    return game


# Card-related methods


@app.post("/classiccard")
async def create_classic_card(
    request: CreateClassicCardRequestModel,
) -> prisma.models.ClassicCard:
    card = await db.classiccard.create(
        {
            "game": {"connect": {"id": request.gameId}},
            "term": request.term,
            "description": request.description,
        }
    )
    return card


@app.delete("/classiccard/{card_id}")
async def delete_classic_card(card_id: int) -> prisma.models.ClassicCard:
    card = await db.classiccard.delete({"id": card_id})
    if card is None:
        raise HTTPException(status_code=404, detail="Could not find a record to delete")
    return card


@app.put("/classiccard/{card_id}")
async def modify_classic_card(
    card_id: int, request: ModifyClassicCardRequestModel
) -> prisma.models.ClassicCard:
    query = request.model_dump()
    keysToDelete = []
    for key in query:
        if not query[key]:
            keysToDelete.append(key)
    for key in keysToDelete:
        query.pop(key)
    card = await db.classiccard.update(where={"id": card_id}, data=query)
    if card is None:
        raise HTTPException(status_code=404, detail="No record could be found")
    return card


@app.post("/matchcard")
async def create_match_card(
    request: CreateMatchCardRequestModel,
) -> prisma.models.MatchCard:
    card = await db.matchcard.create(
        {
            "game": {
                "connect": {
                    "id": request.gameId,
                }
            },
            "imageURL": request.imageURL,
            "name": request.name,
            "description": request.description,
        }
    )
    return card


@app.delete("/matchcard/{card_id}")
async def delete_classic_card(card_id: int) -> prisma.models.MatchCard:
    card = await db.matchcard.delete({"id": card_id})
    if card is None:
        raise HTTPException(status_code=404, detail="Could not find a record to delete")
    return card


@app.put("/matchcard/{card_id}")
async def modify_classic_card(
    card_id: int, request: ModifyMatchCardRequestModel
) -> prisma.models.MatchCard:
    query = request.model_dump()
    keysToDelete = []
    for key in query:
        if not query[key]:
            keysToDelete.append(key)
    for key in keysToDelete:
        query.pop(key)
    card = await db.matchcard.update(where={"id": card_id}, data=query)
    if card is None:
        raise HTTPException(status_code=404, detail="No record could be found")
    return card
