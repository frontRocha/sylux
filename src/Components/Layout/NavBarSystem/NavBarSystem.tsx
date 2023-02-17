import { useContext } from "react";
import { NavLink } from "react-router-dom";

import { Wallet, NoteBlank, SignOut } from 'phosphor-react'

import { AuthFirebase } from "../../../Context/Auth";

import './NavBarSystem.css'

export default function NavBarSystem() {

    const { runLogout, user } = useContext(AuthFirebase)

    let activeClassName: string = "underline";

    return (
        <header className="md:hidden relative bg-primary w-full shadow-xl">
            <nav className="text-center flex justify-around items-center h-full py-4">
                <div className="flex items-center gap-8">
                    <img className="rounded-full w-12 h-12 border-2" src={user?.photoURL || ''} alt={user?.displayName || ''} />
                    <ul className="flex items-center justify-center h-full gap-6">
                        <NavLink
                            to="/dashboard"
                            className={({ isActive }) =>
                                isActive ? activeClassName : 'active'
                            }
                        >
                            <li className="text-white text-2xl"><Wallet /></li>
                        </NavLink>

                        <NavLink
                            to='/postit'
                            className={({ isActive }) =>
                                isActive ? activeClassName : 'active'
                            }>
                            <li className="text-white text-2xl"><NoteBlank /></li>
                        </NavLink>
                    </ul>
                </div>
                <button onClick={runLogout} className="text-white text-2xl py-2 px-2"><SignOut /></button>
            </nav>
        </header>
    )
}