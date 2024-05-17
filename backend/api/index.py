from contextlib import asynccontextmanager
from fastapi import FastAPI, HTTPException, File, UploadFile
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from .models import *
from prisma import Prisma
import prisma.errors
import os
import datetime

DOMAIN = "https://vcb.ilkatkov.ru"
db = Prisma()


@asynccontextmanager
async def lifespan(app: FastAPI):
    await db.connect()
    yield
    await db.disconnect()


app = FastAPI(lifespan=lifespan)

app.add_middleware(
    CORSMiddleware, allow_origins=["*"], allow_headers=["*"], allow_methods=["*"]
)

app.mount("/images", StaticFiles(directory="images"), name="images")
# User-related methods

# Создание пользователя
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


# Получение игр пользователя (для админов)
@app.get("/user/{user_id}/games")
async def get_owned_games(user_id: int) -> list[prisma.models.Game]:

    games = await db.game.find_many(where={"ownerId": user_id})

    return games




# Game-related methods

# Получение игры
@app.get("/game/{game_id}")
async def get_game(game_id: int) -> prisma.models.Game:
    
    # Поиск игры
    game = await db.game.find_unique(
        where={
            "id": game_id,
        },
        include={"classicCards": True, "matchCards": True},
    )

    # Проверка на наличие игры
    if game is None:
        raise HTTPException(
            status_code=404, detail="No record matching the given input could be found"
        )

    return game


# Создание игры
@app.post("/game", status_code=201)
async def create_game(request: CreateGameRequestModel) -> prisma.models.Game:
    
    # Создание записи
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
        },
        {
            "matchCards": True,
            "classicCards": True,
        }
    )

    return game


# Удаление игры
@app.delete("/game/{game_id}")
async def delete_game(game_id: int) -> DeleteGameResponseModel:

    cardsDeleted = await db.classiccard.delete_many({"gameId": game_id})
    cardsDeleted += await db.matchcard.delete_many({"gameId": game_id})
    deletedGame = await db.game.delete({"id": game_id})

    # Проверка на наличие игры к удалению
    if deletedGame is None:
        raise HTTPException(status_code=404, detail="Could not find a record to delete")
    
    return {"cardsDeleted": cardsDeleted, "deletedGame": deletedGame}


# Изменение игры
@app.put("/game/{game_id}")
async def modify_game(
    game_id: int, 
    request: ModifyGameRequestModel) -> prisma.models.Game:
    
    query = request.model_dump()
    keysToDelete = []
    for key in query:
        if not query[key]:
            keysToDelete.append(key)
    for key in keysToDelete:
        query.pop(key)
    game = await db.game.update(where={"id": game_id}, data=query)
    
    # Проверка наличия игры
    if game is None:
        raise HTTPException(status_code=404, detail="No record could be found")
    
    return game


# Card-related methods

# Создание карточки
@app.post("/classiccard")
async def create_classic_card(
    request: CreateClassicCardRequestModel,
    ) -> prisma.models.ClassicCard:
    # Создание записи
    card = await db.classiccard.create(
        {
            "game": {"connect": {"id": request.gameId}},
            "term": request.term,
            "description": request.description,
        }
    )

    return card


# Удаление карточки
@app.delete("/classiccard/{card_id}")
async def delete_classic_card(card_id: int) -> prisma.models.ClassicCard:
    
    card = await db.classiccard.delete({"id": card_id})
    
    # Проверка на наличие удаляемой карточки
    if card is None:
        raise HTTPException(status_code=404, detail="Could not find a record to delete")
    
    return card


# Изменение карточки
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

    # Проверка на наличие изменяемой игры
    if card is None:
        raise HTTPException(status_code=404, detail="No record could be found")
    return card


# MatchCard-related methods

# Создание match-карточки
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


# Удаление match-карточки
@app.delete("/matchcard/{card_id}")
async def delete_match_card(card_id: int) -> prisma.models.MatchCard:
    
    card = await db.matchcard.delete({"id": card_id})
    if card is None:
        raise HTTPException(status_code=404, detail="Could not find a record to delete")
    
    return card


# Изменение match-карточки
@app.put("/matchcard/{card_id}")
async def modify_match_card(
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
    
    # Проверка на наличие изменяемой игры
    if card is None:
        raise HTTPException(status_code=404, detail="No record could be found")
    
    return card

@app.put("/matchcard/{card_id}/imageURL")
async def upload_match_card(
    card_id: int, file: UploadFile = File(...)
    ) -> prisma.models.MatchCard:
    
    now = datetime.datetime.now()
    now = now.strftime("%Y-%m-%d_%H:%M:%S")
    try:
        contents = file.file.read()
        # здесь склеил путь к файлу хранения
        path_f = f'{os.path.abspath(os.curdir)}/images/{now}_{file.filename}'
        path_db = f'{DOMAIN}/images/{now}_{file.filename}'
        with open(path_f, 'wb') as f:      #Путь картинки
            f.write(contents)
        card = await db.matchcard.update(where={"id": card_id}, data={"imageURL":path_db})
    except Exception as e:
        return {"message":str(e)}
    finally:
        file.file.close()

    return card

@app.put("/game/{game_id}/logoURL")
async def upload_game(
    game_id: int, file: UploadFile = File(...)
    ) -> prisma.models.Game:
    
    now = datetime.datetime.now()
    now = now.strftime("%Y-%m-%d_%H:%M:%S")
    try:
        contents = file.file.read()
        # здесь склеил путь к файлу хранения
        path_f = f'{os.path.abspath(os.curdir)}/images/{now}_{file.filename}'
        path_db = f'{DOMAIN}/images/{now}_{file.filename}'
        with open(path_f, 'wb') as f:      #Путь картинки
            f.write(contents)
        game = await db.game.update(where={"id": game_id}, data={"logoURL":path_db})
    except Exception as e:
        return {"message":str(e)}
    finally:
        file.file.close()

    return game