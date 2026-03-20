import { PrismaClient, ProfileRole } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminFullName = process.env.ADMIN_FULL_NAME ?? "Kevin Mok";

  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is required before running the seed script.");
  }

  if (!adminEmail) {
    throw new Error("ADMIN_EMAIL is required before running the seed script.");
  }

  await prisma.profile.upsert({
    where: {
      email: adminEmail.toLowerCase()
    },
    create: {
      email: adminEmail.toLowerCase(),
      fullName: adminFullName,
      role: ProfileRole.ADMIN
    },
    update: {
      fullName: adminFullName,
      role: ProfileRole.ADMIN
    }
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
