import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import axios from "../api/index"

const AUTH_TOKEN = "auth_token"

type TUser = { fullname: string, email: string } | null

type TUserResponse = { success: true, data: TUser } | { success: false, data: { message: string } }

type TLogoutResponse = { success: true, data: {} } | { success: false, data: { message: string } }

type TContext = {
    token: string | null,
    user: TUser,
    handleSetToken: (token: string) => void,
    handleRemoveToken: () => void
}

const contextInitials = {
    token: null,
    user: null,
    handleSetToken: () => { },
    handleRemoveToken: () => { }
}


/* comment */

const AuthContext = createContext<TContext>(contextInitials)

export const useAuthContext = () => useContext(AuthContext)

const getToken = () => localStorage.getItem(AUTH_TOKEN) ?? null


const Auth: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
    const [token, setToken] = useState<string | null>(getToken())
    const [user, setUser] = useState<TUser>(null)

    const login = useCallback(async (token: string) => {
        const userResponse = await axios<TUserResponse>(`/profile?token=${token}`)
        if (userResponse.data.success) {
            setUser(userResponse.data.data)
        }
    }, [])

    const handleSetToken = useCallback((token: string) => {
        localStorage.setItem(AUTH_TOKEN, token)
        setToken(token)
    }, [])

    const handleRemoveToken = useCallback(async () => {
        await axios.delete<TLogoutResponse>(`/logout?token=${token}`)
        localStorage.removeItem(AUTH_TOKEN)
        setToken(null)
    }, [])

    useEffect(() => {
        if (token) {
            login(token)
            return () => setUser(null)
        }
    }, [token])


    const contextValue = useMemo(() => ({ token, user, handleSetToken, handleRemoveToken }), [user])

    return <AuthContext.Provider value={contextValue}>
        {children}
    </AuthContext.Provider>
}

export default Auth