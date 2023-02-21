import { createContext, useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'

import { User } from 'firebase/auth'

import { AuthContextController } from '../Controllers/AuthContextController/AuthContextController'
import { AuthChildren, AuthContext } from '../Interfaces/ContextInterface/ContextInterface'

export const AuthFirebase = createContext({} as AuthContext)

export default function AuthFirebaseProvider({ children }: AuthChildren) {
    const [user, setUser] = useState<User>()
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        receiveDataUser()
    }, [])

    const receiveDataUser = (): void => {
        const receiveUser: string | null = localStorage.getItem("@AuthFirebase:user")
        const receiveToken: string | null = localStorage.getItem("@AuthFirebase:token")

        if (receiveUser && receiveToken) {
            setUser(JSON.parse(receiveUser))
        }

        setLoading(false)
    }

    const runAuth = async (): Promise<void | unknown> => {
        try {
            await new AuthContextController().handleDataGoogleAuth();

            <Navigate to="/dashboard" />

            return receiveDataUser();
        } catch (err: unknown) {
            if (err instanceof Error) {
                console.error(err.message)
            }

            return err
        }
    }

    const runLogout = (): void => {
        localStorage.clear();
        setUser(undefined);

        <Navigate to="/login" />
    }

    return (
        <AuthFirebase.Provider value={{ isAuthenticated: !!user, user, loading, runAuth, runLogout }}>
            {children}
        </AuthFirebase.Provider>
    )
}

