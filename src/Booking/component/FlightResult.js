// // FlightResults.js
// import React, { useEffect, useState } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import api from '../api';
// import './FlightResult.css';
// import Button from '../../shared/UIElements/Button';

// const FlightResults = () => {
//     const [flights, setFlights] = useState([]);
//     const location = useLocation();
//     const navigate = useNavigate();
//     const query = new URLSearchParams(location.search);

//     useEffect(() => {
//         const fetchFlights = async () => {
//             try {
//                 const response = await api.get('/flights/search', {
//                     params: { from: query.get('from'), to: query.get('to') }
//                 });
//                 setFlights(response.data.flights);
//             } catch (error) {
//                 console.error("Error fetching flights", error);
//             }
//         };
//         fetchFlights();
//     }, [query]);

//     const handleBook = (flightId) => {
//         navigate(`/book/${flightId}`);
//     };

//     return (
//         <div>
//             <h2>Flight Results</h2>
//             {flights.map((flight) => (
//                 <div key={flight._id}>
//                     <h3>{flight.airline}</h3>
//                     <p>From: {flight.departure}</p>
//                     <p>To: {flight.arrival}</p>
//                     <p>Price: ${flight.price}</p>
//                     <Button onClick={() => handleBook(flight._id)}>Book Ticket</Button>
//                 </div>
//             ))}
//         </div>
//     );
// };

// export default FlightResults;

import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import api from '../api';
import './FlightResult.css'; // Make sure the path is correct
import Button from '../../shared/UIElements/Button';

const FlightResults = () => {
    const [flights, setFlights] = useState([]);
    const location = useLocation();
    const navigate = useNavigate();
    const query = new URLSearchParams(location.search);

    useEffect(() => {
        const fetchFlights = async () => {
            try {
                const response = await api.get('/flights/search', {
                    params: { from: query.get('from'), to: query.get('to') }
                });
                setFlights(response.data.flights);
            } catch (error) {
                console.error("Error fetching flights", error);
            }
        };
        fetchFlights();
    }, [query]);

    const handleBook = (flight) => {
        navigate(`/book/${flight._id}`, {
            state: { flightDetails: flight }
        });
    };

    return (
        <div className="flight-results-container">
            <h2 className="flight-results-heading">Flight Results</h2>
            {flights.length === 0 ? (
                <p className="no-flights-message">No flights found for your search.</p>
            ) : (
                <div className="flight-cards-container">
                    {flights.map((flight) => (
                        <div key={flight._id} className="flight-card">
                            <h3 className="flight-airline">{flight.airline}</h3>
                            <p className="flight-info"><span>From:</span> {flight.departure}</p>
                            <p className="flight-info"><span>To:</span> {flight.arrival}</p>
                            <p className="flight-price">Price: ${flight.price}</p>
                            <Button onClick={() => handleBook(flight)} className="book-button">Book Ticket</Button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default FlightResults;
