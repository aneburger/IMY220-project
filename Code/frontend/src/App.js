/* Ane' Burger 24565068, 33 */

import React from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Splash from "./pages/Splash";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Projects from "./pages/Projects";
import Profile from "./pages/Profile";
import SingleProject from "./pages/SingleProject";

const App = () => {
    return (
        <BrowserRouter>
            <div>
                {/* <h1>HELLO</h1> */}
                {/* <Navbar/> */}
                <Routes>
                    <Route path="/home" element={<Home />} />
                    <Route path="/" element={<Splash />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/projects" element={<Projects />} />
                    <Route path="/profile:userId" element={<Profile />} />
                    <Route path="/project:projectId" element={<SingleProject />} />
                    {/* <Route path="/splash" element={<Splash />} /> */}
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;