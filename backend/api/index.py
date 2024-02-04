from flask import Flask, Request
from prisma import Prisma

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
