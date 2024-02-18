from flask import Flask

app = Flask(__name__)


@app.route("/")
def home():
    return "Hello, World!"


@app.route("/about")
def about():
    return "About"


@app.route("/user/create", methods=["POST"])
async def create_user(request: Request):
    user_id = request.headers.get("user_id")

    db = Prisma()
    await db.connect()

    try:
        user = await db.user.create({"id": user_id})
        result = {"status": "ok", "user_id": user.id}

    except:
        result = {"status": "error", "user": None}

    finally:
        await db.disconnect()
        return result


@app.route("/game/create")
async def create_game(request: Request):
    game_id = request.headers.get("id")

    db = Prisma()
    await db.connect()

    try:
        user = await db.game.create({"id": game_id})
        result = {"status": "ok", "user_id": user.id}

    except:
        result = {"status": "error", "user": None}

    finally:
        await db.disconnect()
        return result


@app.route("/game/get")
async def get_game(request: Request):
    game_id = request.headers.get("id")

    db = Prisma()
    await db.connect()
    
    try:
        game = await db.game.findUnique({
        where: {
            id: game_id,
        },
        select: {
            gameType: true,
            cards: true,
            matchCards : true,
            theme : true,
            subject : true,
            ownerId : true
        },
        })

        result = {"status": "ok", "gameType": game.gameType, "cards" : game.cards, "matchCards" : game.matchCards, "theme" : game.theme, "subject" : game.subject, "ownerId" : game.ownerId}


    except:
        result = {"status": "error"}

    finally:
        await db.disconnect()
        return result