import { Habits, Prisma } from "@prisma/client";
import dayjs, { Dayjs } from "dayjs";
import { create } from "zustand";

const habitWithRelations = Prisma.validator<Prisma.HabitsDefaultArgs>()({
  select: {
    habit_week_days: true,
    day_habits: true,
    id: true,
    title: true,
    user: true,
    created_at: true,
    deleted_at: true,
    updated_at: true,
  },
});
export type HabitWithRelations = Prisma.HabitsGetPayload<
  typeof habitWithRelations
>;

export type HabitStoreState = {
  selectedHabit: HabitWithRelations | null;
  setSelectedHabit: (element: HabitWithRelations) => void;
  isModalOpen: boolean;
  toggleIsModalOpen: () => void;
  habitDate: Dayjs;
  setHabitDate: (date: Dayjs) => void;
};

export const useHabitStore = create<HabitStoreState>((set, get) => ({
  selectedHabit: null,
  isModalOpen: false,
  setSelectedHabit: (habit: HabitWithRelations) =>
    set({ selectedHabit: habit }),
  toggleIsModalOpen: () =>
    set((state) => {
      if (state.isModalOpen) {
        return {
          isModalOpen: !state.isModalOpen,
          selectedHabit: null,
        };
      }
      return {
        isModalOpen: !state.isModalOpen,
      };
    }),
  habitDate: dayjs(),
  setHabitDate: (date: Dayjs) => set({ habitDate: date }),
}));
