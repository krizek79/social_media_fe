import { useContext } from 'react'
import { AuthContext } from './AuthContext.js'
import {Navigate, Outlet} from "react-router-dom";

export default function PrivateRoutes() {

    const { authenticated } = useContext(AuthContext)

    return (
        authenticated ? <Outlet/> : <Navigate to={"/auth"}/>
    )
}
