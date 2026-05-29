/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios"
import { toast } from "sonner"
import { API_URL } from "../const/env"
import { useTokenStore } from "../stores/token"
// import { useLanguageStore } from "../stores/i18n";

export const setupResponseInterceptor = ({
  logout,
}: {
  logout: () => void
}) => {
  axios.interceptors.response.use(
    (response) => response,
    (error: any) => {
      if (error?.response?.status >= 400) {
        const data = error?.response?.data
        if (error?.response?.status === 401) {
          logout()
        } else {
          if (error?.response?.data?.message) {
            toast.error(data?.message, { id: "axios" })
          }
        }
      } else {
        toast.error(error.message, { id: "axios" })
      }
      return Promise.reject(error)
    }
  )
}

export const setupRequestInterceptor = () => {
  axios.interceptors.request.use(
    (config: any) => {
      const request = { ...config }
      if (!request.url.startsWith("http")) {
        request.url = `${API_URL}${request.url}`
      }

      // const lang = useLanguageStore.getState().lang;
      request.headers = {
        ...request.headers,
        // userLanguage: lang,
      }
      const token = useTokenStore.getState()?.token
      if (token)
        request.headers = {
          ...request.headers,
          Authorization: `Bearer ${token}`,
        }
      return request
    },
    (error) => Promise.reject(error)
  )
}
