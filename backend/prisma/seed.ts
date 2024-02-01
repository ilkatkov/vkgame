import { GameType, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const durov = await prisma.user.create({
    data: {
      id: 1,
    },
  });
  const cardsGame = await prisma.game.create({
    data: {
      gameType: GameType.CARDS,
      cards: {
        create: [
          {
            name: "ВКонтакте",
            description:
              "Самая популярная соцсеть и первое суперприложение в Роcсии",
          },
          {
            name: "Одноклассники",
            description:
              "Первая соцсеть в России, развлекательная платформа с играми, видео и музыкой",
          },
        ],
      },
      subject: "Экосистема ВК",
      ownerId: 1,
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
