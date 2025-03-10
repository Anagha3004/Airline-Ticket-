import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './EditFlight.css';

const EditFlight = () => {
    const { id, flightId } = useParams();
    const navigate = useNavigate();
    const [flightData, setFlightData] = useState({
        name: '',
        departure_airport: '',
        arrival_airport: '',
        departure_time: '',
        arrival_time: '',
        travel_duration: '',
        airline_id: id
    });

    const [flightDetails, setFlightDetails] = useState({
        Totalseats: 0,
        economyseatprice: 0,
        economyseatsavailable: 0,
        firstclassseatprice: 0,
        firstclassseatsavailable: 0,
        businessseatprice: 0,
        businessseatsavailable: 0,
        discount: 0,
        foodavailable: 'yes',
        luggage: 0
    });

    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchFlightData = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/flights/${flightId}`);
                const result = await response.json();
                if (result) {
                    setFlightData({
                        name: result.name,
                        departure_airport: result.departure_airport,
                        arrival_airport: result.arrival_airport,
                        departure_time: result.departure_time,
                        arrival_time: result.arrival_time,
                        travel_duration: result.travel_duration,
                        airline_id: result.airline_id
                    });
                    setFlightDetails({
                        Totalseats: result.Totalseats,
                        economyseatprice: result.economyseatprice,
                        economyseatsavailable: result.economyseatsavailable,
                        firstclassseatprice: result.firstclassseatprice,
                        firstclassseatsavailable: result.firstclassseatsavailable,
                        businessseatprice: result.businessseatprice,
                        businessseatsavailable: result.businessseatsavailable,
                        discount: result.discount,
                        foodavailable: result.foodavailable,
                        luggage: result.luggage
                    });
                }
            } catch (error) {
                console.error('Failed to fetch flight data:', error);
                setMessage('Failed to fetch flight data.');
            }
        };

        fetchFlightData();
    }, [flightId]);

    const handleFlightChange = (e) => {
        setFlightData({ ...flightData, [e.target.name]: e.target.value });
    };

    const handleFlightDetailChange = (e) => {
        setFlightDetails({ ...flightDetails, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = { ...flightData, ...flightDetails };

        try {
            const response = await fetch(`http://localhost:5000/api/flights/editFlight/${flightId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (result.success) {
                setMessage('Flight has been updated successfully!');
                setTimeout(() => {
                    navigate(`/airlineflights/${id}`);
                }, 2000);
            } else {
                setMessage(result.message || 'Failed to update flight. Please try again.');
            }
        } catch (error) {
            console.error('Failed to update flight:', error);
            setMessage('Failed to update flight. Please try again later.');
        }
    };

    return (
        <div className="edit-flight-container">
            <div className="edit-flight-box">
                <h2 className="edit-flight-title">Edit Flight</h2>
                {message && <p className="message">{message}</p>}
                <form className="edit-flight-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Airline ID:</label>
                        <input type="text" name="airline_id" value={flightData.airline_id} readOnly />
                    </div>
                    <div className="form-group">
                        <label>Flight Name:</label>
                        <input type="text" name="name" value={flightData.name} onChange={handleFlightChange} required />
                    </div>
                    <div className="form-group">
                        <label>Departure Airport:</label>
                        <input type="text" name="departure_airport" value={flightData.departure_airport} onChange={handleFlightChange} required />
                    </div>
                    <div className="form-group">
                        <label>Arrival Airport:</label>
                        <input type="text" name="arrival_airport" value={flightData.arrival_airport} onChange={handleFlightChange} required />
                    </div>
                    <div className="form-group">
                        <label>Departure Time:</label>
                        <input type="datetime-local" name="departure_time" value={flightData.departure_time} onChange={handleFlightChange} required />
                    </div>
                    <div className="form-group">
                        <label>Arrival Time:</label>
                        <input type="datetime-local" name="arrival_time" value={flightData.arrival_time} onChange={handleFlightChange} required />
                    </div>
                    <div className="form-group">
                        <label>Travel Duration (in mins):</label>
                        <input type="number" name="travel_duration" value={flightData.travel_duration} onChange={handleFlightChange} required />
                    </div>
                    <div className="form-group">
                        <label>Total Seats:</label>
                        <input type="number" name="Totalseats" value={flightDetails.Totalseats} onChange={handleFlightDetailChange} required />
                    </div>
                    <div className="form-group">
                        <label>Economy Seat Price:</label>
                        <input type="number" name="economyseatprice" value={flightDetails.economyseatprice} onChange={handleFlightDetailChange} required />
                    </div>
                    <div className="form-group">
                        <label>Economy Seats Available:</label>
                        <input type="number" name="economyseatsavailable" value={flightDetails.economyseatsavailable} onChange={handleFlightDetailChange} required />
                    </div>
                    <div className="form-group">
                        <label>First Class Seat Price:</label>
                        <input type="number" name="firstclassseatprice" value={flightDetails.firstclassseatprice} onChange={handleFlightDetailChange} required />
                    </div>
                    <div className="form-group">
                        <label>First Class Seats Available:</label>
                        <input type="number" name="firstclassseatsavailable" value={flightDetails.firstclassseatsavailable} onChange={handleFlightDetailChange} required />
                    </div>
                    <div className="form-group">
                        <label>Business Seat Price:</label>
                        <input type="number" name="businessseatprice" value={flightDetails.businessseatprice} onChange={handleFlightDetailChange} required />
                    </div>
                    <div className="form-group">
                        <label>Business Seats Available:</label>
                        <input type="number" name="businessseatsavailable" value={flightDetails.businessseatsavailable} onChange={handleFlightDetailChange} required />
                    </div>
                    <div className="form-group">
                        <label>Discount (%):</label>
                        <input type="number" name="discount" value={flightDetails.discount} onChange={handleFlightDetailChange} required />
                    </div>
                    <div className="form-group">
                        <label>Food Available:</label>
                        <select name="foodavailable" value={flightDetails.foodavailable} onChange={handleFlightDetailChange} required>
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Luggage (kg):</label>
                        <input type="number" name="luggage" value={flightDetails.luggage} onChange={handleFlightDetailChange} required />
                    </div>

                    <button className="update-button" type="submit">Update Flight</button>
                </form>
            </div>
        </div>
    );
};

export default EditFlight;
