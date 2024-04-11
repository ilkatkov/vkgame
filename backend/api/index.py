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


@app.get("/game/{game_id}")
async def get_game(game_id: int):
    try:
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
            raise HTTPException(status_code=404, detail=str(e))

        return game

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/game", status_code=201)
async def post_game(request: PostGameRequestModel):
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
        return {"game_id": game.id}

    except prisma.errors.MissingRequiredValueError as e:
        raise HTTPException(status_code=417, detail=str(e))

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
