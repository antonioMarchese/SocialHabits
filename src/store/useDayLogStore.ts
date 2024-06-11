import { Habits, Prisma } from "@prisma/client";
import dayjs, { Dayjs } from "dayjs";
import { create } from "zustand";

const DayLogWithRelations = Prisma.validator<Prisma.DayLogDefaultArgs>()({
  include: {
    habits: {
      select: {
        habit: {
          select: {
            title: true,
          },
        },
        completed: true,
        habit_id: true,
      },
    },
  },
});
export type DayLogWithRelations = Prisma.DayLogGetPayload<
  typeof DayLogWithRelations
>;

export type DayLogStoreState = {
  selectedDayLog: DayLogWithRelations | null;
  setSelectedDayLog: (element: DayLogWithRelations | null) => void;
};

export const useDayLogStore = create<DayLogStoreState>((set, get) => ({
  selectedDayLog: null,
  setSelectedDayLog: (dayLog: DayLogWithRelations | null) =>
    set({ selectedDayLog: dayLog }),
}));
