import { sections } from "@/utils/choices";
import { SectionProps } from "@/utils/types/section";
import { Habits, Prisma } from "@prisma/client";
import dayjs, { Dayjs } from "dayjs";
import { create } from "zustand";

export type SectionStoreState = {
  selectedSection: SectionProps;
  setSelectedSection: (section: SectionProps) => void;
};

export const useSectionStore = create<SectionStoreState>((set, get) => ({
  selectedSection: sections[0],
  setSelectedSection: (section: SectionProps) =>
    set({
      selectedSection: section,
    }),
}));
