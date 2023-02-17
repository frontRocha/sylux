import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom"

import Home from "../../Pages/Home/Home"
import Login from "../../Pages/Login/Login"
import Sidebar from "../../Components/Layout/Sidebar/Sidebar"
import DashBoard from "../../Pages/DashBoard/DashBoard"
import PostIt from "../../Pages/PostIt/PostIt"

import { PrivateAcessLogin, PrivateAcessToSystem } from "../Privates/Private"

export const Index = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />

                <Route path="/login" element={
                    <PrivateAcessLogin>
                        <Login />
                    </PrivateAcessLogin>
                } />

                <Route path="/dashboard" element={
                    <PrivateAcessToSystem>
                        <React.Fragment>
                            <Sidebar />
                            <DashBoard />
                        </React.Fragment>
                    </PrivateAcessToSystem>}
                />

                <Route path="/postit" element={
                    <PrivateAcessToSystem>
                        <React.Fragment>
                            <Sidebar />
                            <PostIt />
                        </React.Fragment>
                    </PrivateAcessToSystem>}
                />

            </Routes>
        </BrowserRouter>
    )
}
