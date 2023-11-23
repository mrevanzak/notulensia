import type { Audience } from "@/lib/validations/audience";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

type AudienceState = {
  counter: number;
  audience: Audience[];
  set: (audience: Audience[]) => void;
  add: (audience: Audience | Audience[]) => void;
  reset: () => void;
  remove: (name: string) => void;
};

export const useAudienceStore = create<AudienceState>()(
  devtools((set) => ({
    audience: [],
    counter: 0,
    add: (audience) => {
      set((state) => ({
        audience: [
          ...state.audience,
          ...(Array.isArray(audience) ? audience : [audience]),
        ],
        counter: state.counter + 1,
      }));
    },
    reset: () => {
      set(() => ({
        audience: [],
      }));
    },
    remove: (name) => {
      set((state) => ({
        audience: state.audience.filter((audience) => audience.name !== name),
        counter: state.counter - 1,
      }));
    },
    set: (audience) => {
      set(() => ({
        audience,
      }));
    },
  })),
);
