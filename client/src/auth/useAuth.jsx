import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL

const AuthContext = createContext()

export const useAuth = () => {
    const context = useContext(AuthContext)

    if(!context){
        throw new Error('useAuth must be used within an AuthProvider')
    }

    return context
}

export const AuthProvider = ( {children} ) => {

    const [user, setUser] = useState(null)
    const [token, setToken] = useState(null)
    const [loading, setLoading] = useState(true)

    const login = (user, token) => {
        setUser(user)
        setToken(token)
        localStorage.setItem('user', JSON.stringify(user))
        localStorage.setItem('token', JSON.stringify(token))
    }

    const logout = () => {
        setUser(null)
        setToken(null)

        localStorage.removeItem('user')
        localStorage.removeItem('token')
    }

    const refreshAuth = async () => {
        try {
            const response = await axios.get(
                `${apiBaseUrl}/api/user/auth`, 
                {withCredentials: true}
            )
            const {user, token} = response.data
            login(user, token)
        }
        catch(err){
            console.log(err)
            logout()
        }
        finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        const initAuth = async() => {
            const storedUser = localStorage.getItem('user')
            const storedToken = localStorage.getItem('token')

            if(storedToken && storedUser){
                await refreshAuth()
            }
            else {
                setLoading(false)
            }
        }
        initAuth()
    }, [])

    const isAuthenticated = !!user && !!token

    return <AuthContext.Provider value={{
        user, token, login, logout, refreshAuth, isAuthenticated, loading
    }}>
        {children}
    </AuthContext.Provider>
}