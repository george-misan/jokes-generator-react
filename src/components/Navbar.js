import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
    return (
        <nav className="nav-wrapper grey darken-3">
            <div className="container">
                <a className="brand-logo">Chuck 'Jokes</a>
                <ul className="right">
                    <li><NavLink to='/'>Jokes</NavLink></li>
                    <li><NavLink to='/about'>About</NavLink></li>
                    <li><NavLink to='/contact'>Contact</NavLink></li>
                    

                </ul>

            </div>
        </nav>
    )
}

export default Navbar