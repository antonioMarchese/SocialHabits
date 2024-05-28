import { prisma } from "@/lib/prisma";

export default async function getUserByUsername(username: string) {
  const user = await prisma.users.findUnique({
    where: {
      username,
    },
    include: {
      habits: true,
      days: true,
    },
  });

  return user;
}
