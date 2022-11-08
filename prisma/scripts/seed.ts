import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  if (prisma === undefined) return;
  console.log("Seeding data...");
  // Your seeding logic her
  console.log("Seeding data...");
}

main()
  .then(async () => {
    await prisma?.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma?.$disconnect();
    process.exit(1);
  });
