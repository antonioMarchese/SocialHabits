import { Habits } from "@prisma/client";
import dayjs, { Dayjs } from "dayjs";
import { create } from "zustand";

export type HabitStoreState = {
  selectedHabit: Habits | null;
  setSelectedHabit: (element: Habits) => void;
  isModalOpen: boolean;
  toggleIsModalOpen: () => void;
  habitDate: Dayjs;
  setHabitDate: (date: Dayjs) => void;
};

export const useHabitStore = create<HabitStoreState>((set, get) => ({
  selectedHabit: null,
  isModalOpen: false,
  setSelectedHabit: (habit: Habits) => set({ selectedHabit: habit }),
  toggleIsModalOpen: () =>
    set((state) => ({
      isModalOpen: !state.isModalOpen,
    })),
  habitDate: dayjs(),
  setHabitDate: (date: Dayjs) => set({ habitDate: date }),
}));
