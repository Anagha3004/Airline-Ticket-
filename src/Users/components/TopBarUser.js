import React, { useContext } from 'react';
import './TopBarUser.css'
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from '../../shared/Context/AuthContext';

const TopBarUser = () => {
    const auth = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        auth.logout();
        navigate('/'); // Redirect to homepage after logout
    };

    const handleBackToDashboard = () => {
        navigate('/customer-dashboard'); // Redirect to Customer Dashboard
    };

    return (
        <div className="topbar">
            {/* <img src="logo.png" alt="Logo" className="logo" /> */}
            <h1 className="main-title">Wander Wings</h1>
            <nav>
                <ul className="nav-links">
                    {auth.isLoggedIn && auth.userRole === 'customer' && (
                        <>
                            <li>
                                <NavLink to="/allflights">All Flights</NavLink>
                            </li>
                            <li>
                                <button className="back-button" onClick={handleBackToDashboard}>Back to Dashboard</button>
                            </li>
                        </>
                    )}
                    {auth.isLoggedIn && (
                        <li>
                            <button className="logout-button" onClick={handleLogout}>LOGOUT</button>
                        </li>
                    )}
                </ul>
            </nav>
        </div>
    );
};

export default TopBarUser;