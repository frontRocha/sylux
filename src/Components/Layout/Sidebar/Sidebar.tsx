import { useContext } from 'react'
import { NavLink } from "react-router-dom";

import { Wallet, NoteBlank, SignOut } from 'phosphor-react'

import { AuthFirebase } from "../../../Context/Auth";

import './Sideber.css'

export default function Sidebar() {

    const { user, runLogout } = useContext(AuthFirebase)

    let activeClassName = "underline";

    return (
        <header className="hidden md:flex justify-center items-center fixed w-[70px] bg-primary min-h-full h-full shadow-xl py-4">
            <nav className="text-center flex flex-col justify-between items-center h-full max-h-[1000px]">
                <div className="flex flex-col items-center gap-8">
                    <img className="rounded-full w-12 h-12 border-2" src={user?.photoURL || ''} alt={user?.displayName || ''}/>
                    <ul className="flex flex-col items-center justify-center h-full gap-6">
                        <NavLink
                            to="/dashboard"
                            className={({ isActive }) =>
                                isActive ? activeClassName : 'teste'
                            }
                        >
                            <li className="text-white text-2xl"><Wallet /></li>
                        </NavLink>

                        <NavLink
                            to='/postit'
                            className={({ isActive }) =>
                                isActive ? activeClassName : 'teste'
                            }>
                            <li className="text-white text-2xl"><NoteBlank /></li>
                        </NavLink>
                    </ul>
                </div>
                <button onClick={runLogout} className="text-white text-2xl rounded-2xl py-2 px-2"><SignOut /></button>
            </nav>
        </header>
    )
}