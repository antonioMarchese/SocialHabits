"use client";

import Calendar from "../(components)/calendar";
import HabitsCard from "../(components)/habits/card";
import CreateHabitsModal from "../(components)/habits/createHabitsModal";

export default function HomeCalendar() {
  return (
    <div className="w-full flex flex-col">
      <div className="p-2 sm:p-6 w-full flex flex-col gap-4 2xl:flex-row text-white">
        <HabitsCard />
        <Calendar />
      </div>
      <CreateHabitsModal />
    </div>
  );
}
