import prisma.enums
import prisma.models
from pydantic import BaseModel


class CardCreateModel(BaseModel):
    name: str
    description: str
    image_src: str


class ThemeCreateModel(BaseModel):
    fill_type: prisma.enums.FillType
    bg_color: str
    bg_color_gradient: str | None = None
    accent_color: str


class PostGameRequestModel(BaseModel):
    user_id: int
    game_type: prisma.enums.GameType
    cards: list[CardCreateModel]
    welcome_title: str
    welcome_description: str
    theme: ThemeCreateModel | None = None
    title: str
    icon: str


class ModifyGameRequestModel(BaseModel):
    game_type: prisma.enums.GameType | None = None
    welcome_title: str | None = None
    welcome_description: str | None = None
    title: str | None = None
    icon: str | None = None


class DeleteGameResponseModel(BaseModel):
    cards_deleted: int
    deleted_game: prisma.models.Game


class CreateCardRequestModel(BaseModel):
    game_id: int
    name: str
    description: str
    image_src: str


class ModifyCardRequestModel(BaseModel):
    name: str | None = None
    description: str | None = None
    image_src: str | None = None


class CreateThemeRequestModel(BaseModel):
    game_id: int
    fill_type: prisma.enums.FillType
    bg_color: str
    bg_color_gradient: str | None = None
    accent_color: str


class ModifyThemeRequestModel(BaseModel):
    fill_type: prisma.enums.FillType
    bg_color: str
    bg_color_gradient: str | None = None
    accent_color: str
