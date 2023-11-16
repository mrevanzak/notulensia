import { httpClient } from "@/lib/http";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getUserKey } from "./get-user";

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userId: string) => {
      await httpClient.delete(`/user/${userId}`);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: [getUserKey] });
    },
  });
};
