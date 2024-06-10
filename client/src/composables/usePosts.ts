import { getPosts } from "@/api/posts.api";
import { useQuery } from "@tanstack/vue-query";
import { Ref, watch } from "vue";

export function usePosts(projectId: Ref<string>) {
  const { data, error } = useQuery({
    queryKey: ["posts", projectId],
    queryFn: async ({ queryKey }) => {
      const res = await getPosts(queryKey[1])
      return res
    },
  });

  watch(error, error => {
    console.error(error)
  })
  

  return {
    data,
  }
}