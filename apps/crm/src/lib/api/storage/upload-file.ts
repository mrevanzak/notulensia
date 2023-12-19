
import { STORAGE_URL } from "@/lib/http";
import { useAuthStore } from "@/stores/use-auth-store";
import { useMutation } from "@tanstack/react-query";

export const useUploadImage = () => {

  interface ApiResponse {
    id: string;
  }
  
  return useMutation({
    mutationFn: async (formData: FormData) => {
      const response = await fetch(`${STORAGE_URL}/storage/asset`, {
        method: 'POST',
        headers: {
          "Authorization": `Bearer ${useAuthStore.getState().access_token}`
        },
        body: formData,
      });
        return await response.json() as ApiResponse;
    },
  });
};
