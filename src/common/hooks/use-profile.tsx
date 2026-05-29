import { useAuthzStore } from "@/common/stores/authz"
import { useUserStore } from "@/common/stores/user"
import { useGetProfile } from "@/services/query/auth"
import { useEffect, useState } from "react"

export function useProfile() {
  const [loading, setLoading] = useState(true)
  const { data, isSuccess, isError } = useGetProfile()
  const setUser = useUserStore((state) => state.setUser)
  const setAuthz = useAuthzStore((state) => state.setAuthz)

  useEffect(() => {
    function saveData() {
      const { rolePermissions, ...user } = data
      setUser(user)
      setAuthz(rolePermissions)
      setLoading(false)
    }

    if (isSuccess && data) {
      saveData()
    }
  }, [data, isSuccess])

  return {
    loading,
    isError,
  }
}
