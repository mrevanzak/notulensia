import { httpClient } from "@/lib/http";
import { dashboardSchema } from "@/lib/validations/dashboard";
import { useQuery } from "@tanstack/react-query";

export const getDashboardKey = "getDashboardStats";

export const useGetDashboardStats = () => {
  return useQuery({
    queryKey: [getDashboardKey],
    queryFn: async () => {
      const response = await httpClient.get("/dashboard");

      return dashboardSchema.parse(response.data);
    },
  });
};
