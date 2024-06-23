import { getPostById } from "@/api/posts.api";
import { UnauthorizedError } from "@/errors/UnauthorizedError";
import { useQuery } from "@tanstack/vue-query";
import { Ref, watch } from "vue";

export function usePostById(postId: Ref<string>) {
  const { data, error, isFetching, isFetched } = useQuery({
    queryKey: ["post", postId],
    queryFn: async ({ queryKey }) => {
      const res = await getPostById(queryKey[1])
      return res
    },
    throwOnError: true,
    retry: (failureCount, error) => {
      if (error instanceof UnauthorizedError) {
        return false
      }

      return failureCount <= 3
    },
    staleTime: 1000 * 60 * 5
  });

  watch(error, error => {
    console.error(error)
  })
  

  return {
    data,
    isFetched,
    isFetching
  }
}