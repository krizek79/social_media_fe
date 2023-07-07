import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./component/layout/Header.jsx";
import Footer from "./component/layout/Footer.jsx";
import Home from "./component/layout/Home.jsx";
import Login from "./component/security/Login.jsx";
import RegistrationSuccessful from "./component/security/RegistrationSuccessful.jsx";
import Profile from "./component/user/Profile.jsx";
import PostDetail from "./component/post/PostDetail.jsx";
import ExplorePage from "./component/explore/ExplorePage.jsx";
import PrivateRoutes from "./component/security/PrivateRoutes.jsx";
import AuthProvider from "./component/security/AuthProvider.jsx";

export default function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <div className="flex flex-col min-h-screen max-h-screen overflow-y-hidden">
                    <Header/>
                    <main className="overflow-y-scroll">
                        <Routes>
                            <Route path="/auth" element={<Login />}/>
                            <Route path="/registration-successful" element={<RegistrationSuccessful />}/>
                            <Route element={<PrivateRoutes />}>
                                <Route index element={<Home />}/>
                                <Route path="/profile" element={<Profile />}/>
                                <Route path="/post" element={<PostDetail />}/>
                                <Route path="/explore" element={<ExplorePage />}/>
                            </Route>
                        </Routes>
                    </main>
                    <Footer/>
                </div>
            </AuthProvider>
        </BrowserRouter>
    )
}
