import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./component/Header.jsx";
import Footer from "./component/Footer.jsx";
import Home from "./component/Home.jsx";
import Login from "./component/Login.jsx";
import RegistrationSuccessful from "./component/RegistrationSuccessful.jsx";
import Profile from "./component/Profile.jsx";

export default function App() {
    return (
        <BrowserRouter>
            <div className="flex flex-col min-h-screen max-h-screen overflow-y-hidden">
                <Header/>
                <main className="overflow-y-scroll">
                    <Routes>
                        <Route index element={<Home />}/>
                        <Route path="/authentication" element={<Login />}/>
                        <Route path="/registration-successful" element={<RegistrationSuccessful />}/>
                        <Route path="/profile" element={<Profile />}/>
                    </Routes>
                </main>
                <Footer/>
            </div>
        </BrowserRouter>
    )
}
