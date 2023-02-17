import { User } from "firebase/auth"

export type AuthChildren = {
    children: React.ReactNode
}

export interface AuthContext {
    isAuthenticated: boolean
    user: User | undefined
    loading: boolean
    runAuth: () => void
    runLogout: () => void
}