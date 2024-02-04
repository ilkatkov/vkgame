import asyncio
from prisma import Prisma
from prisma.enums import GameType


async def main() -> None:
    db = Prisma()
    await db.connect()

    durov = await db.user.create({})
    cards_game = await db.game.create(
        {
            "gameType": GameType.CARDS,
            "cards": {
                "create": [
                    {
                        "name": "ВКонтакте",
                        "description": "Самая популярная соцсеть и первое суперприложение в Роcсии",
                    },
                    {
                        "name": "Одноклассники",
                        "description": "Первая соцсеть в России, развлекательная платформа с играми, видео и музыкой",
                    },
                ],
            },
            "subject": "Экосистема ВК",
            "ownerId": durov.id,
        }
    )

    await db.disconnect()


if __name__ == "__main__":
    asyncio.run(main())
