"use client";

import { api } from "@/trpc/react";
import { redirect } from "next/navigation";
import Calendar from "./(components)/calendar";
import FeedContainer from "./(components)/feed/container";
import CreateHabitsModal from "./(components)/habits/createHabitsModal";
import HabitsCard from "./(components)/habits/card";

export default function Home() {
  const { data: userData, isFetching } = api.users.me.useQuery();

  if (isFetching)
    return (
      <div className="w-full h-full flex text-white items-center justify-center">
        Carregando...
      </div>
    );

  if (!userData) return redirect("/");

  return (
    <div className="w-full h-full text-white flex flex-col gap-4 items-start justify-start p-6">
      <div className="w-full flex flex-col lg:flex-row gap-4">
        <HabitsCard />
        <Calendar />
      </div>
      <FeedContainer />
      <CreateHabitsModal />
    </div>
  );
}
