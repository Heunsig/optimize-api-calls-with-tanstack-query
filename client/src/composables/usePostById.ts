import { getPostById } from "@/api/posts.api";
import { useQuery } from "@tanstack/vue-query";
import { Ref, watch } from "vue";

export function usePostById(postId: Ref<string>) {
  const { data, error, isFetching } = useQuery({
    queryKey: ["post", postId],
    queryFn: async ({ queryKey }) => {
      const res = await getPostById(queryKey[1])
      return res
    },
    staleTime: 1000 * 60 * 5
  });

  watch(error, error => {
    console.error(error)
  })
  

  return {
    data,
    isFetching
  }
}