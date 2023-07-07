import FooterMenu from "./FooterMenu.jsx";
import FooterBasic from "./FooterBasic.jsx";
import {useContext} from "react";
import {AuthContext} from "../security/AuthContext.js";

export default function Footer() {

    const { authenticated } = useContext(AuthContext)

    return (
        authenticated ? <FooterMenu/> : <FooterBasic/>
    )
}