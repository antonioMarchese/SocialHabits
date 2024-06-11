"use client";
import { useHabitStore } from "@/store/useHabitStore";
import { api } from "@/trpc/react";

export const useProfileHabits = () => {
  const utils = api.useUtils();

  const { habitDate } = useHabitStore();

  const {
    isFetching: isFetchingDayHabits,
    data: dayHabits,
    isPending,
  } = api.habits.dayHabits.useQuery(
    {
      day: habitDate.startOf("day").toString(),
    },
    {
      staleTime: Infinity,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    }
  );

  const { isFetching: isFetchingHabits, data: habits } =
    api.habits.getAll.useQuery(undefined, {
      staleTime: Infinity,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    });

  return {
    dayHabits,
    habits,
    isFetching: isFetchingDayHabits || isFetchingHabits || isPending,
  };
};
