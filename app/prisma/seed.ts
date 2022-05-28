import { prisma } from "../lib/prisma";

// データを投入
const main = async () => {
  await prisma.task.createMany({
    data: [
      { title: "sample task 1", done: true },
      { title: "sample task 2", done: true },
      { title: "sample task 3", done: false },
    ],
  });
};

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // 接続を切る
    await prisma.$disconnect();
  });
