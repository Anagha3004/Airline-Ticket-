// src/components/AirlinePage.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Airline.css';

const AirlinePage = () => {
    const [airline, setAirline] = useState(null);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    // Fetch airline and flights on component mount
    useEffect(() => {
        const fetchAirlineAndFlights = async () => {
            const serviceCode = localStorage.getItem('serviceCode');

            try {
                const response = await fetch('http://localhost:5000/api/flights/airlineAndFlights', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ serviceCode }),
                });
                const responseData = await response.json();

                if (responseData.message) {
                    setMessage(responseData.message);
                } else {
                    setAirline(responseData.airline);
                }
            } catch (error) {
                console.error('Failed to fetch airline and flights:', error);
            }
        };

        fetchAirlineAndFlights();
    }, []);

    // Navigate to the Airline Flights page
    const handleAirlineClick = () => {
        if (airline) {
            navigate(`/airlineflights/${airline._id}`);
        }
    };

    return (
        <div className="airline-page-container">
            <h1 className="airline-page-title">Service Provider Airline Page</h1>

            {message && <p className="airline-message">{message}</p>}

            {airline ? (
                <div onClick={handleAirlineClick} className="airline-card">
                    <h2 className="airline-name">{airline.name}</h2>
                    <p className="airline-card-text">Click to manage flights</p>
                </div>
            ) : (
                <p className="no-airline-message">No airline available. Please contact support to add an airline.</p>
            )}
        </div>
    );
};

export default AirlinePage;



// import React, { useEffect, useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import './Airline.css'; // Import the external CSS for this page

// const AirlinePage = () => {
//     const [airline, setAirline] = useState(null);
//     const [message, setMessage] = useState('');
//     const navigate = useNavigate();

//     // Fetch airline and flights on component mount
//     useEffect(() => {
//         const fetchAirlineAndFlights = async () => {
//             const serviceCode = localStorage.getItem('serviceCode');

//             try {
//                 const response = await fetch('http://localhost:5000/api/flights/airlineAndFlights', {
//                     method: 'POST',
//                     headers: { 'Content-Type': 'application/json' },
//                     body: JSON.stringify({ serviceCode }),
//                 });
//                 const responseData = await response.json();

//                 if (responseData.message) {
//                     setMessage(responseData.message);
//                 } else {
//                     setAirline(responseData.airline);
//                 }
//             } catch (error) {
//                 console.error('Failed to fetch airline and flights:', error);
//             }
//         };

//         fetchAirlineAndFlights();
//     }, []);

//     // Navigate to the Airline Flights page
//     const handleAirlineClick = () => {
//         if (airline) {
//             navigate(`/airlineflights/${airline._id}`);
//         }
//     };

//     return (
//         <div className="airline-page-container">
//             <h1>Service Provider Airline Page</h1>

//             {message && <p>{message}</p>}

//             {airline ? (
//                 <div onClick={handleAirlineClick} className="card">
//                     <h2>{airline.name}</h2>
//                     <p>Click to manage flights</p>
//                 </div>
//             ) : (
//                 <p>No airline available. Please contact support to add an airline.</p>
//             )}
//         </div>
//     );
// };

// export default AirlinePage;
