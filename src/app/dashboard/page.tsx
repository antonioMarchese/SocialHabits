"use client";

import { api } from "@/trpc/react";
import { redirect } from "next/navigation";
import FeedContainer from "./(components)/feed/container";
import CreateHabitsModal from "./(components)/habits/createHabitsModal";
import HabitsCard from "./(components)/habits/card";
import WeekDayScheduler from "./(components)/habits/weekDayScheduler";
import { useHabitStore } from "@/store/useHabitStore";
import { useEffect } from "react";
import dayjs from "dayjs";
import HabitsLoader from "@/components/habitsLoader";
import { useSectionStore } from "@/store/useSectionStore";
import { homeSection } from "@/utils/choices";
import StreaksCard from "./(components)/habits/streaksCard";

export default function Home() {
  const { data: userData, isFetching } = api.users.me.useQuery();
  const { setHabitDate } = useHabitStore();
  const { setSelectedSection } = useSectionStore();

  useEffect(() => {
    setHabitDate(dayjs());
    setSelectedSection(homeSection);
  }, []);

  if (isFetching)
    return (
      <div className="w-full h-full flex text-white items-center justify-center">
        <HabitsLoader />
      </div>
    );

  if (!userData) return redirect("/");

  return (
    <div className="w-full text-white flex flex-col gap-4 items-start justify-start p-2 sm:p-6 pb-5">
      <div className="w-full flex flex-col gap-4 3xl:flex-row">
        <div className="w-full flex flex-col lg:flex-row gap-4">
          <HabitsCard />
          <WeekDayScheduler />
        </div>
        <StreaksCard />
      </div>
      {/* <FeedContainer /> */}
      <CreateHabitsModal />
    </div>
  );
}
