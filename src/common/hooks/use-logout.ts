import { useAuthzStore } from "@/common//stores/authz"
import { useModalStore } from "@/common/stores/model"
import { useTokenStore } from "@/common/stores/token"
import { useUserStore } from "@/common/stores/user"
import { useNavigate } from "react-router"

export function useLogout() {
  const navigate = useNavigate()
  const { removeUser } = useUserStore()
  const { removeAuthz } = useAuthzStore()
  const { removeToken } = useTokenStore()
  const closeModal = useModalStore((state) => state.closeModal)

  const logout = () => {
    removeAuthz()
    removeUser()
    closeModal()
    removeToken()
    navigate("/", { replace: true })
  }

  return logout
}
