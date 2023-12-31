import type {Demo} from "@/types/types";

export const EventService = {
  getEvents() {
    return fetch("/demo/data/scheduleevents.json", {
      headers: {"Cache-Control": "no-cache"},
    })
      .then((res) => res.json())
      .then((d: {data: Demo.Event[]}) => d.data);
  },
};
