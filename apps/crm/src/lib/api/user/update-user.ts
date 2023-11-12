import { httpClient } from "@/lib/http";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { User, UserFormValues } from "@/lib/validations/user";
import { getUserKey } from "./get-user";
import { getUserDetailKey } from "./get-user-detail";

type UpdateUserParams = UserFormValues & Pick<User, "id">;

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: UpdateUserParams) => {
      await httpClient.put(`/user/${data.id}`, data);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: [getUserKey] });
      void queryClient.invalidateQueries({
        queryKey: [getUserDetailKey],
      });
    },
  });
};
