import { httpClient } from "@/lib/http";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Option } from "@/lib/validations/user";
import { getUserOptionKey } from "./get-user-option";

export const useUpdateUserOption = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: Option[]) => {
      await httpClient.put("/user/option", data);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: [getUserOptionKey] });
    },
  });
};
