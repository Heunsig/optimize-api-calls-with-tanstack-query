import { getProjects } from "@/api/projects.api";
import { UnauthorizedError } from "@/errors/UnauthorizedError";
import { useQuery } from "@tanstack/vue-query";
import { watch } from "vue";

export function useProjects() {
  const { data, error, isPending, isLoading, isLoadingError } = useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      const res = await getProjects()
      return res
    },
    throwOnError: true,
    retry: (failureCount, error) => {
      if (error instanceof UnauthorizedError) {
        return false
      }
      
      return failureCount <= 3
    },
    staleTime: 1000 * 60 * 5,
  });

  watch(error, error => {
    console.error(error)
  })
  

  return {
    data,
    error,
    isPending,
    isLoading,
    isLoadingError
  }
}