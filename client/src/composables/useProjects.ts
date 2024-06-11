import { getProjects } from "@/api/projects.api";
import { useQuery } from "@tanstack/vue-query";
import { watch } from "vue";

export function useProjects() {
  const { data, error } = useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      const res = await getProjects()
      return res
    },
    staleTime: 1000 * 60 * 5,
  });

  watch(error, error => {
    console.error(error)
  })
  

  return {
    data,
  }
}