// src/components/CustomerDashboard.js
import React, { useContext } from 'react';
import { AuthContext } from '../../shared/Context/AuthContext';
import { useNavigate } from 'react-router-dom';
import TopBarUser from '../components/TopBarUser';
import './CustomerDashBoard.css';

const CustomerDashboard = () => {
    const auth = useContext(AuthContext);
    const navigate = useNavigate();

    const handleNavigateToFlights = () => {
        navigate('/allflights-user');
    };

    return (
        <div className="dashboard-container">
            {/* Keep TopBarUser at the top */}
            <div className="top-bar-container">
                <TopBarUser />
            </div>

            <h2 className="dashboard-heading">Welcome to the Customer Dashboard</h2>
            <p className="dashboard-text">You can view all flights below:</p>

            {auth.isLoggedIn && auth.userRole === 'customer' && (
                <button className="dashboard-button" onClick={handleNavigateToFlights} style={{ color: 'inherit' }}>
                    All Flights
                </button>
            )}
        </div>
    );
};

export default CustomerDashboard;
