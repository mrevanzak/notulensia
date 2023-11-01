import { create } from "zustand";
import { devtools } from "zustand/middleware";

type ScheduleProgram = {
  startTime: string;
  endTime: string;
  position: number;
  activity: string;
  picName: string;
  date: string;
  note: string;
};

type ScheduleProgramState = {
  scheduleProgram: ScheduleProgram[];
  addScheduleProgram: (scheduleProgram: ScheduleProgram) => void;
  reset: () => void;
};

export const useScheduleProgramStore = create<ScheduleProgramState>()(
  devtools((set) => ({
    scheduleProgram: [],
    addScheduleProgram: (scheduleProgram) => {
      set((state) => ({
        scheduleProgram: [...state.scheduleProgram, scheduleProgram],
      }));
    },
    reset: () => {
      set(() => ({
        scheduleProgram: [],
      }));
    },
  })),
);
