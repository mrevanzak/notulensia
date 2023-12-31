import { httpClient } from "@/lib/http";
import { useMutation } from "@tanstack/react-query";

export const useSendNotification = (eventId: string) => {
  return useMutation({
    mutationFn: async () => {
      const response = await httpClient.get(`/event/send/agenda/${eventId}`, {
        responseType: "blob",
      });

      return response.data as Blob;
    },
    onSuccess: (data) => {
      const url = window.URL.createObjectURL(data);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `pdf-${Date.now()}.pdf`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    },
  });
};
