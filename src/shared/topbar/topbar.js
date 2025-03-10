import React, { useContext } from 'react';
import './Topbar.css';
import { NavLink, useNavigate } from "react-router-dom"; // Import useNavigate
import { AuthContext } from '../Context/AuthContext';
import Button from '../UIElements/Button';

const TopBar = () => {
    const auth = useContext(AuthContext);
    const navigate = useNavigate(); // Get navigate function

    const handleLogout = () => {
        auth.logout(); // Call logout function from context
        navigate('/'); // Redirect to homepage after logout
    };

    return (
        <div className="topbar">
            <h1 className="main-title">Wander Wings</h1>
            <nav>
                <ul className="nav-links">
                    {auth.isLoggedIn && auth.userRole === 'customer' && (
                        <li>
                            <NavLink to="/allflights">All Flights</NavLink>
                        </li>
                    )}
                    
                    {auth.isLoggedIn && auth.userRole === 'admin' && (
                        <li>
                            <NavLink to="/users/serviceproviders">Service Providers</NavLink>
                        </li>
                    )}
                    {auth.isLoggedIn && auth.userRole === 'serviceProvider' && (
                        <li>
                            <NavLink to="/createAirline">Add Airline</NavLink>
                        </li>
                    )}
                    
                    {auth.isLoggedIn && (
                        <li>
                            <button className="logout-button" onClick={handleLogout}>LOGOUT</button>
                        </li>
                    )}
                    {/* Add Login button */}
                    {!auth.isLoggedIn && (
                        <li>
                            <Button className="login-button" onClick={() => navigate('/login')}>Get Started</Button>
                        </li>
                    )}
                </ul>
            </nav>
        </div>
    );
};

export default TopBar;
