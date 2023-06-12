import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./component/layout/Header.jsx";
import Footer from "./component/layout/Footer.jsx";
import Home from "./component/layout/Home.jsx";
import Login from "./component/authentication/Login.jsx";
import RegistrationSuccessful from "./component/authentication/RegistrationSuccessful.jsx";
import Profile from "./component/user/Profile.jsx";
import PostDetail from "./component/post/PostDetail.jsx";

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
                        <Route path="/post" element={<PostDetail />}/>
                    </Routes>
                </main>
                <Footer/>
            </div>
        </BrowserRouter>
    )
}
