import { prisma } from "@/lib/prisma";

export default async function getUserByEmail(email: string) {
  const user = await prisma.users.findUnique({
    where: {
      email,
    },
  });

  return user;
}
