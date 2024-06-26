import "server-only";

import { JWTPayload, SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

interface SessionPayload extends JWTPayload {
  username: string;
  expiresAt: string;
}

const SESSION_IDENTIFIER = "habits_session";

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

export async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);
}

export async function decrypt(session: string | undefined = "") {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload as SessionPayload;
  } catch (error) {
    console.log("Failed to verify session");
  }
}

export async function createSession(username: string) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const session = await encrypt({
    username,
    expiresAt: expiresAt.toDateString(),
  });

  cookies().set(SESSION_IDENTIFIER, session, {
    httpOnly: true,
    secure: false,
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
}

export function deleteSession() {
  cookies().delete(SESSION_IDENTIFIER);
}
