export {}

declare global {
  // ============================================================
  // AUTH
  // ============================================================

  type Login = {
    email: string
    password: string
  }

  type ForgetPass = {
    email: string
  }

  type ResetPass = {
    password: string
    confirmPassword: string
  }

  type ChangePass = {
    password: string
    newPassword: string
  }

  // ============================================================
  // USER / AUTH PROFILE
  // ============================================================

  type Profile = {
    id: string
    username?: string
    displayName?: string
    phoneNo?: string
    email?: string
    profileImageUrl?: string
    roleName?: string
  }

  // ============================================================
  // USERS
  // ============================================================

  type Users = {
    id: number
    firstName: string
    lastName: string
    maidenName: string
    age: number
    gender: string
    email: string
    phone: string
  }

  // ============================================================
  // ROLE & PERMISSION
  // ============================================================

  type Permission = {
    id?: string
    module?: string
    action?: string
    description?: string | null
  }

  type Role = {
    id?: string
    username: string
    roleName: string
    description?: string | null
    active?: boolean
    permissions?: Permission[]
  }

  type RolePermission = {
    roleName: string
    allPermissions: Permission[]
    assignedPermissionIds: string[]
  }

  // ============================================================
  // CATEGORY & TAG
  // ============================================================

  type Category = {
    id?: string
    code?: string
    name: string
    description?: string | null
    isActive?: boolean
    createdAt?: string
  }

  type Tag = {
    id?: string
    code?: string
    name: string
    description?: string | null
    isActive?: boolean
    createdAt?: string
  }

  // ============================================================
  // SHARED
  // ============================================================

  type ApiListResponse<T> = {
    data: T[]
    total: number
  }
}
