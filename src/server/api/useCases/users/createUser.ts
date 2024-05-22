import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";
import { z } from "zod";

export const createUserProps = z.object({
  firstName: z.string(),
  lastName: z.optional(z.string()),
  email: z.string().email(),
  username: z.string(),
  password: z.string(),
});

export type CreateUserProps = z.infer<typeof createUserProps>;

export default async function createUser({
  firstName,
  lastName,
  email,
  password,
  username,
}: CreateUserProps) {
  const hashedPassword = await hash(password, 12);

  const newUser = await prisma.users.create({
    data: {
      first_name: firstName,
      last_name: lastName,
      email,
      username,
      password: hashedPassword,
    },
  });

  return newUser;
}
