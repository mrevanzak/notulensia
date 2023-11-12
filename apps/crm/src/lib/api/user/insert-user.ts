import { httpClient } from "@/lib/http";
import type { UserFormValues } from "@/lib/validations/company";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getUserDropdownKey } from "../company/get-user-dropdown";

export const useInsertUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: UserFormValues) => {
      await httpClient.post("/user", data);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: [getUserDropdownKey] });
    },
  });
};
