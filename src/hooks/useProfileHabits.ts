"use client";
import { useHabitStore } from "@/store/useHabitStore";
import { api } from "@/trpc/react";
import dayjs from "dayjs";

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

  const { isFetching: isFetchingStreaks, data: streaks } =
    api.habits.getStreaks.useQuery(
      {
        day: dayjs().startOf("day").toString(),
      },
      {
        staleTime: Infinity,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
      }
    );

  return {
    dayHabits,
    habits,
    streaks,
    isFetching:
      isFetchingDayHabits || isFetchingHabits || isFetchingStreaks || isPending,
  };
};
