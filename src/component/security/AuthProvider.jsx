import { AuthContext } from "./AuthContext.js"
import {useEffect, useState} from "react"
import { useNavigate } from "react-router-dom"
import Cookies from "js-cookie"

export default function AuthProvider({ children }) {

    const navigate = useNavigate()
    const [authenticated, setAuthenticated] = useState(
        () => Cookies.get("authenticated") === "true"
    )
    const [authData, setAuthData] = useState({
        token: "",
        expiresAt: ""
    })

    useEffect(() => {
        const token = Cookies.get("token")
        const expiresAt = Cookies.get("expiresAt")
        const user = Cookies.get("user")

        if (!token || !expiresAt || !user) {
            logout()
        }
    }, [])

    const login = (data) => {
        setAuthenticated(true)
        Cookies.set("token", data.token)
        Cookies.set("expiresAt", data.expiresAt)
        Cookies.set("user", JSON.stringify(data.user))
        Cookies.set("authenticated", true)
    }

    const logout = () => {
        setAuthData(null)
        setAuthenticated(false)
        Cookies.remove("token")
        Cookies.remove("expiresAt")
        Cookies.remove("user")
        Cookies.set("authenticated", false)
        navigate("/auth")
    }

    const getUser = () => {
        return Cookies.get("user") ? JSON.parse(Cookies.get("user")) : null
    }

    return (
        <AuthContext.Provider value={{ authenticated, authData, login, logout, getUser }}>
            {children}
        </AuthContext.Provider>
    )
}
