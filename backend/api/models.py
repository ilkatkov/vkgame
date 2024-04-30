import prisma.enums
import prisma.models
from pydantic import BaseModel


class ClassicCardCreateModel(BaseModel):
    term: str
    description: str


class MatchCardCreateModel(BaseModel):
    imageURL: str
    name: str | None = None
    description: str | None = None


class CreateGameRequestModel(BaseModel):
    ownerId: int
    logoURL: str
    background: int
    welcomeTitle: str
    welcomeBody: str
    subject: str
    leaveTitle: str | None = None
    leaveBody: str | None = None
    leaveURL: str | None = None
    gameType: prisma.enums.GameType
    classicCards: list[ClassicCardCreateModel] | None = []
    rounds: int | None = None
    matchCards: list[MatchCardCreateModel] | None = []


class DeleteGameResponseModel(BaseModel):
    cardsDeleted: int
    deletedGame: prisma.models.Game


class ModifyGameRequestModel(BaseModel):
    logoURL: str | None = None
    background: int | None = None
    welcomeTitle: str | None = None
    welcomeBody: str | None = None
    subject: str | None = None
    leaveTitle: str | None = None
    leaveBody: str | None = None
    leaveURL: str | None = None
    rounds: int | None = None


class CreateClassicCardRequestModel(ClassicCardCreateModel):
    gameId: int


class ModifyClassicCardRequestModel(BaseModel):
    term: str | None = None
    description: str | None = None


class CreateMatchCardRequestModel(MatchCardCreateModel):
    gameId: int


class ModifyMatchCardRequestModel(BaseModel):
    imageURL: str | None = None
    name: str | None = None
    description: str | None = None
