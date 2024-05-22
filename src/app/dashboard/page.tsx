"use client";

import { api } from "@/trpc/react";
import { redirect } from "next/navigation";
import Calendar from "./(components)/calendar";
import FeedContainer from "./(components)/feed/container";

export default function Home() {
  const {
    data: userData,
    error: userError,
    isFetching,
  } = api.users.me.useQuery();

  if (isFetching)
    return (
      <div className="w-full h-full flex text-white items-center justify-center">
        Carregando...
      </div>
    );

  if (!userData) return redirect("/");

  return (
    <div className="w-full h-full text-white flex flex-col lg:flex-row lg:items-start gap-4 items-center justify-start p-6">
      <Calendar />
      <FeedContainer />
    </div>
  );
}
