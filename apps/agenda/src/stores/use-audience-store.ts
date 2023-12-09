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
      set((state) => {
        const newAudience = Array.isArray(audience) ? audience : [audience];
        const isUnique = newAudience.every(
          (audience) =>
            !state.audience.find((item) => item.email === audience.email),
        );

        if (!isUnique) return state;

        return {
          audience: [...state.audience, ...newAudience],
          counter: state.counter + 1,
        };
      });
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
