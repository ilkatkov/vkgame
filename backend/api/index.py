import asyncio
from flask import Flask, request
from prisma import Prisma
import prisma.errors
import prisma.enums
import prisma.models


async def prepare_prisma():
    global db
    db = Prisma()
    await db.connect()


app = Flask(__name__)


@app.route("/")
def home():
    return "Hello, World!"


@app.route("/about")
def about():
    return "About"


@app.route("/game/<int:game_id>", methods=["GET"])
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

        return {
            "response": {
                "id": game_id,
                "title": game.title,
                "theme": (
                    {
                        "fill_type": game.theme.fill_type,
                        "bg_color": game.theme.bg_color,
                        "bg_color_gradient": game.theme.bg_color_gradient,
                        "accent_color": game.theme.accent_color,
                    }
                    if game.theme is not None
                    else None
                ),
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
        raise e
        return {"error": str(e)}, 500


@app.route("/game/", methods=["POST"])
async def post_game():
    try:
        data = request.json["request"]
        game = await db.game.create(
            {
                "owner": {
                    "connect": {
                        "id": data["user_id"],
                    }
                },
                "title": data["title"],
                "theme": (
                    {
                        "create": {
                            "fill_type": data["theme"]["fill_type"],
                            "bg_color": data["theme"]["bg_color"],
                            "bg_color_gradient": data["theme"].get(
                                "bg_color_gradient", None
                            ),
                            "accent_color": data["theme"]["accent_color"],
                        },
                    }
                    if data.get("theme", None)
                    else None
                ),
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


if __name__ == "__main__":
    asyncio.run(prepare_prisma())
    app.run(debug=True)
