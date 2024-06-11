"use client";
import { api } from "@/trpc/react";
import dayjs from "dayjs";

export const useProfileDayLogs = () => {
  const { data } = api.dayLogs.monthSummary.useQuery(
    {
      date: dayjs().startOf("day").toString(),
    },
    {
      gcTime: 1000 * 60 * 60 * 6,
      staleTime: 100 * 60 * 60 * 3,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    }
  );

  return {
    dayLogs: data,
  };
};
