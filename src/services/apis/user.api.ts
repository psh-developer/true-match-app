import axios from "axios"

export function getAllUsers(params?: URLSearchParams) {
  return axios.get("/users", { params })
}
