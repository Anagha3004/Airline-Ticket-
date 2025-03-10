import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import './AirlineFlights.css'; // Import the external CSS

const AirlineFlights = () => {
    const { airlineId } = useParams();
    const navigate = useNavigate();
    const [flights, setFlights] = useState([]);
    const [airlineName, setAirlineName] = useState('');

    useEffect(() => {
        const fetchFlights = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/flights/airlineflightlist/${airlineId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch flights');
                }
                const responseData = await response.json();
                setFlights(responseData.flights);
                setAirlineName(responseData.airlineName); // Assuming the airline name is returned from the API
            } catch (error) {
                console.error('Failed to fetch flights:', error);
            }
        };

        fetchFlights();
    }, [airlineId]);

    const handleDeleteFlight = async (flightId) => {
        try {
            const response = await fetch(`http://localhost:5000/api/flights/${flightId}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                setFlights(flights.filter((flight) => flight._id !== flightId));
            } else {
                console.error('Failed to delete flight.');
            }
        } catch (error) {
            console.error('Error deleting flight:', error);
        }
    };

    return (
        <div className="airline-flights-container">
            <h1 className="airline-name-title">Flights under {airlineName}</h1>
            <Link to={`/addflight/${airlineId}`}>
                <button className="add-flight-button">Add Flight</button>
            </Link>

            {flights.length > 0 ? (
                <table className="flights-table">
                    <thead>
                        <tr>
                            <th>Flight Name</th>
                            <th>Departure Airport</th>
                            <th>Arrival Airport</th>
                            <th>Departure Time</th>
                            <th>Arrival Time</th>
                            <th>Travel Duration</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {flights.map((flight) => (
                            <tr key={flight._id}>
                                <td>{flight.name}</td>
                                <td>{flight.departure_airport}</td>
                                <td>{flight.arrival_airport}</td>
                                <td>{new Date(flight.departure_time).toLocaleString()}</td>
                                <td>{new Date(flight.arrival_time).toLocaleString()}</td>
                                <td>{flight.travel_duration} mins</td>
                                <td>
                                    <button onClick={() => handleDeleteFlight(flight._id)} className="delete-button">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p className="no-flights-message">No flights available. Add a flight.</p>
            )}
        </div>
    );
};

export default AirlineFlights;
