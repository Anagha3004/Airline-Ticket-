import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './FlightSearch.css';

const FlightSearch = () => {
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const navigate = useNavigate();

    const handleSearch = () => {
        navigate(`/flights?from=${from}&to=${to}`);
    };

    return (
        <div className="flight-search-container">
            <h2>Search Flights</h2>
            <div className="search-form">
                <input
                    type="text"
                    placeholder="Departure (From)"
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Arrival (To)"
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                />
                <button onClick={handleSearch}>Search</button>
            </div>
        </div>
    );
};

export default FlightSearch;
