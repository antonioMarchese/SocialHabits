"use client";

import { api } from "@/trpc/react";
import LoginForm from "./(components)/loginForm";
import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const utils = api.useUtils();
  const router = useRouter();

  useEffect(() => {
    //  Improve it
    async function fetchUserData() {
      try {
        const data = await utils.users.me.fetch();
        if (data) {
          router.push("/dashboard");
        }
      } catch (error) {
        console.error({ error });
        console.info("Sem dados do usuário");
      }
    }
    fetchUserData();
  }, [utils, router]);

  return (
    <main className="flex w-full min-h-screen flex-col items-center justify-center gap-10 p-10">
      <header className="w-full flex flex-col items-center justify-center">
        <p className="whitespace-normal text-zinc-400 font-light text-center md:text-sm text-xs flex flex-col gap-2">
          <strong className="text-3xl text-white whitespace-normal font-bold">
            Habits
          </strong>
          ajuda você a criar e manter hábitos saudáveis
        </p>
      </header>
      <LoginForm />
      <footer className="w-full text-center text-white font-light">
        <p>Ainda não tem uma conta? </p>
        <Link
          href="/register"
          className="text-violet-500 font-bold no-underline hover:text-primary-light"
        >
          Registre-se agora!
        </Link>
      </footer>
    </main>
  );
}
