import Header from "./component/Header.jsx";
import Footer from "./component/Footer.jsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./component/Login.jsx";
import Home from "./component/Home.jsx";
import RegistrationSuccessful from "./component/RegistrationSuccessful.jsx";
import Profile from "./component/Profile.jsx";

export default function App() {
    return(
        <>
            <BrowserRouter>
                <Header/>
                <Routes>
                    <Route index element={<Login/>}/>
                    <Route path="/login" element={<Login/>}></Route>
                    <Route path="/registration-successful" element={<RegistrationSuccessful/>}></Route>
                    <Route path="/home" element={<Home/>}/>
                    <Route path="/profile" element={<Profile/>}></Route>
                </Routes>
                <Footer/>
            </BrowserRouter>
        </>
    )
}