// // FlightDetails.js
// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import './FlightDetails.css';
// import BookingForm from "../../Booking/component/BookingForm";

// const FlightDetails = () => {
//     const { flightId } = useParams();
//     const [flightDetails, setFlightDetails] = useState(null);
//     const [error, setError] = useState(null);
//     const [isBooking, setIsBooking] = useState(false);

//     useEffect(() => {
//         const fetchFlightDetails = async () => {
//             try {
//                 const response = await fetch(`http://localhost:5000/api/flights/${flightId}`);
//                 const responseData = await response.json();

//                 if (!response.ok) {
//                     throw new Error(responseData.message || "Could not fetch flight details.");
//                 }

//                 setFlightDetails(responseData);
//             } catch (err) {
//                 setError(err.message);
//             }
//         };

//         fetchFlightDetails();
//     }, [flightId]);

//     const handleBookingSuccess = () => {
//         setIsBooking(false);
//     };

//     if (error) {
//         return <div>Error: {error}</div>;
//     }

//     if (!flightDetails) {
//         return <div>Loading flight details...</div>;
//     }

//     return (
//         <div className="flight-details-container">
//             <h2>Flight Details</h2>
//             <div className="flight-info">
//                 <p><strong>Total Seats:</strong> {flightDetails.flightDetails.Totalseats}</p>
//                 <p><strong>Economy Seat Price:</strong> ₹{flightDetails.flightDetails.economyseatprice}</p>
//                 <p><strong>Economy Seats Available:</strong> {flightDetails.flightDetails.economyseatsavailable}</p>
//                 <p><strong>First Class Seat Price:</strong> ₹{flightDetails.flightDetails.firstclassseatprice}</p>
//                 <p><strong>First Class Seats Available:</strong> {flightDetails.flightDetails.firstclassseatsavailable}</p>
//                 <p><strong>Business Seat Price:</strong> ₹{flightDetails.flightDetails.businessseatprice}</p>
//                 <p><strong>Business Seats Available:</strong> {flightDetails.flightDetails.businessseatsavailable}</p>
//                 <p><strong>Discount:</strong> {flightDetails.flightDetails.discount}%</p>
//                 <p><strong>Food Available:</strong> {flightDetails.flightDetails.foodavailable ? "Yes" : "No"}</p>
//                 <p><strong>Luggage Allowance:</strong> {flightDetails.flightDetails.luggage} kg</p>
//             </div>
//             <button onClick={() => setIsBooking(true)}>Book Ticket</button>

//             {isBooking && (
//                 <BookingForm
//                     flightId={flightId}
//                     flightDetails={flightDetails.flightDetails}
//                     onBookingSuccess={handleBookingSuccess}
//                 />
//             )}
//         </div>
//     );
// };

// export default FlightDetails;




import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Add useNavigate
import './FlightDetails.css';
import BookingForm from "../../Booking/component/BookingForm";

const FlightDetails = () => {
    const { flightId } = useParams();
    const navigate = useNavigate(); // Initialize navigate hook
    const [flightDetails, setFlightDetails] = useState(null);
    const [error, setError] = useState(null);
    const [isBooking, setIsBooking] = useState(false);

    useEffect(() => {
        const fetchFlightDetails = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/flights/${flightId}`);
                const responseData = await response.json();

                if (!response.ok) {
                    throw new Error(responseData.message || "Could not fetch flight details.");
                }

                setFlightDetails(responseData);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchFlightDetails();
    }, [flightId]);

    const handleBookingSuccess = () => {
        setIsBooking(false);
    };

    const handleBookNow = () => {
        navigate(`/bookticket/${flightId}`, { state: { flightDetails } }); // Pass flight data in state
    };

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!flightDetails) {
        return <div>Loading flight details...</div>;
    }

    return (
        <div className="flight-details-page"> {/* Apply background only for this page */}
            <div className="flight-details-container">
                <h2>Flight Details</h2>
                <div className="flight-info">
                    <p><strong>Total Seats:</strong> {flightDetails.flightDetails.Totalseats}</p>
                    <p><strong>Economy Seat Price:</strong> ₹{flightDetails.flightDetails.economyseatprice}</p>
                    <p><strong>Economy Seats Available:</strong> {flightDetails.flightDetails.economyseatsavailable}</p>
                    <p><strong>First Class Seat Price:</strong> ₹{flightDetails.flightDetails.firstclassseatprice}</p>
                    <p><strong>First Class Seats Available:</strong> {flightDetails.flightDetails.firstclassseatsavailable}</p>
                    <p><strong>Business Seat Price:</strong> ₹{flightDetails.flightDetails.businessseatprice}</p>
                    <p><strong>Business Seats Available:</strong> {flightDetails.flightDetails.businessseatsavailable}</p>
                    <p><strong>Discount:</strong> {flightDetails.flightDetails.discount}%</p>
                    <p><strong>Food Available:</strong> {flightDetails.flightDetails.foodavailable ? "Yes" : "No"}</p>
                    <p><strong>Luggage Allowance:</strong> {flightDetails.flightDetails.luggage} kg</p>
                </div>
                <button onClick={handleBookNow}>Book Ticket</button>
            </div>
        </div>
    );
};

export default FlightDetails;
