import asyncio
from flask import Flask, abort, request
from prisma import Prisma
import prisma.errors
import prisma.enums
import prisma.models


db = Prisma()
asyncio.run(db.connect())

app = Flask(__name__)


@app.route("/")
def home():
    return "Hello, World!"


@app.route("/about")
def about():
    return "About"


# @app.route("/user/create", methods=["POST"])
# async def create_user(request: Request):
#     user_id = request.headers.get("user_id")

#     db = Prisma()
#     await db.connect()

#     try:
#         user = await db.user.create({"id": user_id})
#         result = {"status": "ok", "user_id": user.id}

#     except:
#         result = {"status": "error", "user": None}

#     finally:
#         await db.disconnect()
#         return result


# @app.route("/game/create")
# async def create_game(request: Request):
#     game_id = request.headers.get("id")

#     db = Prisma()
#     await db.connect()

#     try:
#         user = await db.game.create({"id": game_id})
#         result = {"status": "ok", "user_id": user.id}

#     except:
#         result = {"status": "error", "user": None}

#     finally:
#         await db.disconnect()
#         return result


@app.route("/game/<int:game_id>", methods=["GET"])
async def get_game(game_id: int):

    # Подключаться к Призме лучше единожды в момент запуска Фласка
    # db = Prisma()
    # await db.connect()

    try:
        game = await db.game.find_unique(
            where={
                "id": game_id,
            }
        )

        return {
            "response": {
                "id": game_id,
                "title": game.title,
                "theme": {
                    "fill_type": game.theme.fill_type,
                    "bg_color": game.theme.bg_color,
                    "bg_color_gradient": game.theme.bg_color_gradient,
                    "accent_color": game.theme.accent_color,
                },
                "icon": game.icon,
                "mode": game.gameType,
                "welcome": {
                    "title": game.welcomeTitle,
                    "description": game.welcomeDescription,
                },
                "cards": list(
                    map(
                        lambda card: {
                            "title": card.name,
                            "description": card.description,
                            "url": card.imageSrc,
                        },
                        game.cards,
                    )
                ),
            }
        }, 200

    except prisma.errors.RecordNotFoundError as e:
        return {
            "error": str(e),
        }, 404

    except Exception as e:
        return {"error": str(e)}, 500


@app.route("/game/", methods=["POST"])
async def post_game():
    data = request.json()["request"]

    try:
        game = await db.game.create(
            {
                "ownerId": data["user_id"],
                "title": data["title"],
                "theme": {
                    "create": {
                        "fill_type": data["fill_type"],
                        "bg_color": data["bg_color"],
                        "bg_color_gradient": data["bg_color_gradient"],
                        "accent_color": data["accent_color"],
                    },
                },
                "icon": data["icon"],
                "gameType": data["mode"],
                "welcomeTitle": data["welcome"]["title"],
                "welcomeDescription": data["welcome"]["description"],
                "cards": {
                    "create": [
                        {
                            "name": card["title"],
                            "description": card["description"],
                            "imageSrc": card["url"],
                        }
                        for card in data["cards"]
                    ],
                },
            }
        )

        return {
            "game_id": game.id,
        }, 201

    except prisma.errors.MissingRequiredValueError as e:
        return {
            "error": str(e),
        }, 417

    except Exception as e:
        return {
            "error": str(e),
        }, 500
