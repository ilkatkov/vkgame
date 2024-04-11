import prisma.enums
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