import { useQuery } from "@tanstack/react-query"
import { useSearchParams } from "react-router-dom"

import { getAllUsers } from "../apis/user.api"

export const keys = {
  all: ["user"] as const,
  lists: () => [...keys.all, "list"] as const,
  list: (filters: string) => [...keys.lists(), { filters }] as const,
}

export function useGetAllUsers() {
  const [searchParams] = useSearchParams()

  return useQuery({
    queryKey: keys.list(searchParams.toString()),

    queryFn: async () => {
      const res = await getAllUsers(searchParams)
      return res.data
    },

    placeholderData: (previousData) => previousData,
  })
}
