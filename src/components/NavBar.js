import React from 'react'
import { Link } from 'react-router-dom'

const Navbar=()=> {
    return (
        <nav className="navbar bg-info">
            <div className="nav-button1">
                <Link to="/" className="navbar-brand">Payments App</Link>
            </div>
            <div className="nav-button2">
                <ul className="nav-list">
                    <li className="nav-list-item">
                        <Link to="/" style={{ textDecoration: 'none' }}>Transfer</Link>
                    </li>
                    <li className="nav-list-item">
                        <Link to="Dashboard" style={{ textDecoration: 'none' }}>Dashboard</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}
export default Navbar;