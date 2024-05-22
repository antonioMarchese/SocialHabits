import { prisma } from "@/lib/prisma";

export default async function getUserByUsername(username: string) {
  const user = await prisma.users.findUnique({
    where: {
      username,
    },
  });

  return user;
}
