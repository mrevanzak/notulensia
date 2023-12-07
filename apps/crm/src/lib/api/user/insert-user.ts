import { httpClient } from "@/lib/http";
import type { UserFormValues } from "@/lib/validations/user";
import { insertUserReturnSchema } from "@/lib/validations/user";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getUserDropdownKey } from "./get-user-dropdown";

export const useInsertUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: UserFormValues) => {
      const response = await httpClient.post("/user", data);

      return insertUserReturnSchema.parse(response.data);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: [getUserDropdownKey] });
    },
  });
};
