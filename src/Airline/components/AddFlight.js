// import React, { useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import './AddFlight.css'

// const AddFlight = () => {
//     const { airlineId } = useParams();
//     const navigate = useNavigate();
//     const [flightData, setFlightData] = useState({
//         name: '',
//         departure_airport: '',
//         arrival_airport: '',
//         departure_time: '',
//         arrival_time: '',
//         travel_duration: '',
//         airline_id: airlineId
//     });

//     const [flightDetails, setFlightDetails] = useState({
//         Totalseats: 0,
//         economyseatprice: 0,
//         economyseatsavailable: 0,
//         firstclassseatprice: 0,
//         firstclassseatsavailable: 0,
//         businessseatprice: 0,
//         businessseatsavailable: 0,
//         discount: 0,
//         foodavailable: 'yes',
//         luggage: 0
//     });

//     const [message, setMessage] = useState('');

//     const handleFlightChange = (e) => {
//         setFlightData({ ...flightData, [e.target.name]: e.target.value });
//     };

//     const handleFlightDetailChange = (e) => {
//         setFlightDetails({ ...flightDetails, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const data = { ...flightData, ...flightDetails };

//         try {
//             const response = await fetch('http://localhost:5000/api/flights/addFlight', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify(data)
//             });

//             const result = await response.json();

//             if (result.flight) {
//                 setMessage('Flight has been added successfully!');
//                 setTimeout(() => {
//                     navigate(`/airlineflights/${airlineId}`);
//                 }, 2000);
//             } else {
//                 setMessage(result.message || 'Failed to add flight. Please try again.');
//             }
//         } catch (error) {
//             setMessage('Failed to add flight. Please try again later.');
//         }
//     };

//     return (
//         <div className="add-flight-container">
//             <div className="add-flight-box">
//                 <h2 className="add-flight-title">Add Flight</h2>
//                 {message && <p className="message">{message}</p>}
//                 <form onSubmit={handleSubmit}>
//                     <div className="flight-data-container">
//                         <div className="flight-data-item">
//                             <label>Airline ID:</label>
//                             <input
//                                 type="text"
//                                 name="airline_id"
//                                 value={flightData.airline_id}
//                                 readOnly
//                             />
//                         </div>
//                         <div className="flight-data-item">
//                             <label>Flight Name:</label>
//                             <input
//                                 type="text"
//                                 name="name"
//                                 value={flightData.name}
//                                 onChange={handleFlightChange}
//                                 required
//                             />
//                         </div>
//                         <div className="flight-data-item">
//                             <label>Departure Airport:</label>
//                             <input
//                                 type="text"
//                                 name="departure_airport"
//                                 value={flightData.departure_airport}
//                                 onChange={handleFlightChange}
//                                 required
//                             />
//                         </div>
//                         <div className="flight-data-item">
//                             <label>Arrival Airport:</label>
//                             <input
//                                 type="text"
//                                 name="arrival_airport"
//                                 value={flightData.arrival_airport}
//                                 onChange={handleFlightChange}
//                                 required
//                             />
//                         </div>
//                         <div className="flight-data-item">
//                             <label>Departure Time:</label>
//                             <input
//                                 type="datetime-local"
//                                 name="departure_time"
//                                 value={flightData.departure_time}
//                                 onChange={handleFlightChange}
//                                 required
//                             />
//                         </div>
//                         <div className="flight-data-item">
//                             <label>Arrival Time:</label>
//                             <input
//                                 type="datetime-local"
//                                 name="arrival_time"
//                                 value={flightData.arrival_time}
//                                 onChange={handleFlightChange}
//                                 required
//                             />
//                         </div>
//                         <div className="flight-data-item">
//                             <label>Travel Duration (in mins):</label>
//                             <input
//                                 type="number"
//                                 name="travel_duration"
//                                 value={flightData.travel_duration}
//                                 onChange={handleFlightChange}
//                                 required
//                             />
//                         </div>
//                     </div>

//                     <div className="flight-details-container">
//                         <div className="flight-details-item">
//                             <label>Total Seats:</label>
//                             <input 
//                                 type="number" 
//                                 name="Totalseats" 
//                                 value={flightDetails.Totalseats} 
//                                 onChange={handleFlightDetailChange} 
//                                 required 
//                             />
//                         </div>
//                         <div className="flight-details-item">
//                             <label>Economy Seat Price:</label>
//                             <input 
//                                 type="number" 
//                                 name="economyseatprice" 
//                                 value={flightDetails.economyseatprice} 
//                                 onChange={handleFlightDetailChange} 
//                                 required 
//                             />
//                         </div>
//                         <div className="flight-details-item">
//                             <label>Economy Seats Available:</label>
//                             <input 
//                                 type="number" 
//                                 name="economyseatsavailable" 
//                                 value={flightDetails.economyseatsavailable} 
//                                 onChange={handleFlightDetailChange} 
//                                 required 
//                             />
//                         </div>
//                         <div className="flight-details-item">
//                             <label>First Class Seat Price:</label>
//                             <input 
//                                 type="number" 
//                                 name="firstclassseatprice" 
//                                 value={flightDetails.firstclassseatprice} 
//                                 onChange={handleFlightDetailChange} 
//                                 required 
//                             />
//                         </div>
//                         <div className="flight-details-item">
//                             <label>First Class Seats Available:</label>
//                             <input 
//                                 type="number" 
//                                 name="firstclassseatsavailable" 
//                                 value={flightDetails.firstclassseatsavailable} 
//                                 onChange={handleFlightDetailChange} 
//                                 required 
//                             />
//                         </div>
//                         <div className="flight-details-item">
//                             <label>Business Seat Price:</label>
//                             <input 
//                                 type="number" 
//                                 name="businessseatprice" 
//                                 value={flightDetails.businessseatprice} 
//                                 onChange={handleFlightDetailChange} 
//                                 required 
//                             />
//                         </div>
//                         <div className="flight-details-item">
//                             <label>Business Seats Available:</label>
//                             <input 
//                                 type="number" 
//                                 name="businessseatsavailable" 
//                                 value={flightDetails.businessseatsavailable} 
//                                 onChange={handleFlightDetailChange} 
//                                 required 
//                             />
//                         </div>
//                         <div className="flight-details-item">
//                             <label>Discount (%):</label>
//                             <input 
//                                 type="number" 
//                                 name="discount" 
//                                 value={flightDetails.discount} 
//                                 onChange={handleFlightDetailChange} 
//                                 required 
//                             />
//                         </div>
//                         <div className="flight-details-item">
//                             <label>Food Available:</label>
//                             <select 
//                                 name="foodavailable" 
//                                 value={flightDetails.foodavailable} 
//                                 onChange={handleFlightDetailChange} 
//                                 required
//                             >
//                                 <option value="yes">Yes</option>
//                                 <option value="no">No</option>
//                             </select>
//                         </div>
//                         <div className="flight-details-item">
//                             <label>Luggage (kg):</label>
//                             <input 
//                                 type="number" 
//                                 name="luggage" 
//                                 value={flightDetails.luggage} 
//                                 onChange={handleFlightDetailChange} 
//                                 required 
//                             />
//                         </div>
//                     </div>

//                     <button type="submit">Add Flight</button>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default AddFlight;








import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './AddFlight.css'

const AddFlight = () => {
    const { airlineId } = useParams();
    const navigate = useNavigate();

    const [flightData, setFlightData] = useState({
        name: '',
        departure_airport: '',
        arrival_airport: '',
        departure_time: '',
        arrival_time: '',
        travel_duration: '',
        airline_id: airlineId
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

    const handleFlightChange = ({ target: { name, value } }) => {
        setFlightData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleFlightDetailChange = ({ target: { name, value } }) => {
        const numericValue = name !== "foodavailable" ? Math.max(0, value) : value;
        setFlightDetails(prevState => ({ ...prevState, [name]: numericValue }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = { ...flightData, ...flightDetails };

        try {
            const response = await fetch('http://localhost:5000/api/flights/addFlight', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (result.flight) {
                setMessage('Flight has been added successfully!');
                setTimeout(() => navigate(`/airlineflights/${airlineId}`), 2000);
            } else {
                setMessage(result.message || 'Failed to add flight. Please try again.');
            }
        } catch (error) {
            setMessage('Failed to add flight. Please try again later.');
        }
    };

    return (
        <div className="add-flight-container">
            <div className="add-flight-box">
                <h2 className="add-flight-title">Add Flight</h2>
                {message && <p className="message">{message}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="flight-data-container">
                        <div className="flight-data-item">
                            <label>Airline ID:</label>
                            <input type="text" name="airline_id" value={flightData.airline_id} readOnly />
                        </div>
                        <div className="flight-data-item">
                            <label>Flight Name:</label>
                            <input type="text" name="name" value={flightData.name} onChange={handleFlightChange} required />
                        </div>
                        <div className="flight-data-item">
                            <label>Departure Airport:</label>
                            <input type="text" name="departure_airport" value={flightData.departure_airport} onChange={handleFlightChange} required />
                        </div>
                        <div className="flight-data-item">
                            <label>Arrival Airport:</label>
                            <input type="text" name="arrival_airport" value={flightData.arrival_airport} onChange={handleFlightChange} required />
                        </div>
                        <div className="flight-data-item">
                            <label>Departure Time:</label>
                            <input type="datetime-local" name="departure_time" value={flightData.departure_time} onChange={handleFlightChange} required />
                        </div>
                        <div className="flight-data-item">
                            <label>Arrival Time:</label>
                            <input type="datetime-local" name="arrival_time" value={flightData.arrival_time} onChange={handleFlightChange} required />
                        </div>
                        <div className="flight-data-item">
                            <label>Travel Duration (in mins):</label>
                            <input type="number" name="travel_duration" value={flightData.travel_duration} onChange={handleFlightChange} required />
                        </div>
                    </div>

                    <div className="flight-details-container">
                        <div className="flight-details-item">
                            <label>Total Seats:</label>
                            <input type="number" name="Totalseats" value={flightDetails.Totalseats} onChange={handleFlightDetailChange} required />
                        </div>
                        <div className="flight-details-item">
                            <label>Economy Seat Price:</label>
                            <input type="number" name="economyseatprice" value={flightDetails.economyseatprice} onChange={handleFlightDetailChange} required />
                        </div>
                        <div className="flight-details-item">
                            <label>Economy Seats Available:</label>
                            <input type="number" name="economyseatsavailable" value={flightDetails.economyseatsavailable} onChange={handleFlightDetailChange} required />
                        </div>
                        <div className="flight-details-item">
                            <label>First Class Seat Price:</label>
                            <input type="number" name="firstclassseatprice" value={flightDetails.firstclassseatprice} onChange={handleFlightDetailChange} required />
                        </div>
                        <div className="flight-details-item">
                            <label>First Class Seats Available:</label>
                            <input type="number" name="firstclassseatsavailable" value={flightDetails.firstclassseatsavailable} onChange={handleFlightDetailChange} required />
                        </div>
                        <div className="flight-details-item">
                            <label>Business Seat Price:</label>
                            <input type="number" name="businessseatprice" value={flightDetails.businessseatprice} onChange={handleFlightDetailChange} required />
                        </div>
                        <div className="flight-details-item">
                            <label>Business Seats Available:</label>
                            <input type="number" name="businessseatsavailable" value={flightDetails.businessseatsavailable} onChange={handleFlightDetailChange} required />
                        </div>
                        <div className="flight-details-item">
                            <label>Discount (%):</label>
                            <input type="number" name="discount" value={flightDetails.discount} onChange={handleFlightDetailChange} required />
                        </div>
                        <div className="flight-details-item">
                            <label>Food Available:</label>
                            <select name="foodavailable" value={flightDetails.foodavailable} onChange={handleFlightDetailChange} required>
                                <option value="yes">Yes</option>
                                <option value="no">No</option>
                            </select>
                        </div>
                        <div className="flight-details-item">
                            <label>Luggage (kg):</label>
                            <input type="number" name="luggage" value={flightDetails.luggage} onChange={handleFlightDetailChange} required />
                        </div>
                    </div>
                    <div class="button-container">
        <button type="submit">Add Flight</button>
    </div>
                </form>
            </div>
        </div>
    );
};

export default AddFlight;
