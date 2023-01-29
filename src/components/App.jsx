import Header from "./Header";
import Footer from "./Footer";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./Login.jsx";
import Home from "./Home.jsx";
import Register from "./Register";

export default function App() {
    return(
        <>
            <BrowserRouter>
                <Header/>
                <Routes>
                    <Route index element={<Login/>}/>
                    <Route path="/login" element={<Login/>}></Route>
                    <Route path="/home" element={<Home/>}/>
                </Routes>
                <Footer/>
            </BrowserRouter>
        </>
    )
}