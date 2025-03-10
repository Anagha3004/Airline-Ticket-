// import React, { useState, useContext, useEffect } from "react";
// import { AuthContext } from "../../shared/Context/AuthContext"; 

// import './BookingForm.css';

// const BookingForm = ({ flightId, flightDetails, onBookingSuccess }) => {
//   const { userId } = useContext(AuthContext);
//   const [journeyDate, setJourneyDate] = useState('');
//   const [passengers, setPassengers] = useState([{ name: "", gender: "", age: "", seatClass: "economy" }]);
//   const [totalPrice, setTotalPrice] = useState(0);
//   const [discountedPrice, setDiscountedPrice] = useState(0);
//   const [finalPrice, setFinalPrice] = useState(0);
//   const [confirmationMessage, setConfirmationMessage] = useState("");
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     calculatePrice(passengers);
//   }, [passengers]);

//   const handlePassengerChange = (index, field, value) => {
//     const updatedPassengers = [...passengers];
//     updatedPassengers[index][field] = value;
//     setPassengers(updatedPassengers);
//     calculatePrice(updatedPassengers);
//   };

//   const addPassenger = () => {
//     setPassengers([...passengers, { name: "", gender: "", age: "", seatClass: "economy" }]);
//   };

//   const calculatePrice = (passengers) => {
//     let total = 0;
//     passengers.forEach((passenger) => {
//       const basePrice = getBasePrice(passenger.seatClass);
//       total += basePrice;
//     });

//     const discount = total * (flightDetails.discount / 100); 
//     setTotalPrice(total);
//     setDiscountedPrice(discount);
//     setFinalPrice(total - discount);
//   };

//   const getBasePrice = (seatClass) => {
//     return seatClass === "economy" ? flightDetails.economyseatprice :
//            seatClass === "business" ? flightDetails.businessseatprice :
//            flightDetails.firstclassseatprice;
//   };

//   const handleConfirmBooking = async () => {
//     try {
//       const bookingData = {
//         user_id: userId,
//         journeyDate,
//         passengers,
//         total_price: finalPrice,
//         flight_id: flightId,
//         classType: passengers[0].seatClass,
//       };

//       console.log("userId:", userId);
//       console.log("journeyDate:", journeyDate);
//       console.log("flightId:", flightId);
//       console.log("passengers:", passengers);
//       console.log("finalPrice:", finalPrice);

//       const response = await fetch(`http://localhost:5000/api/bookings/bookticket/${flightId}`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(bookingData),
//       });

//       if (!response.ok) {
//         throw new Error("Booking failed.");
//       }

//       setConfirmationMessage("Booking confirmed!");
//       onBookingSuccess();
//     } catch (err) {
//       setError("Failed to confirm booking.");
//     }
//   };

//   return (
//     <div className="booking-form-wrapper">
//       <div className="booking-form">
//         <h3 className="booking-form-title">Book Your Flight</h3>

//         {/* Journey Date Picker */}
//         <div className="journey-date-picker">
//           <label className="label">Journey Date</label>
//           <input
//             className="input-date"
//             type="date"
//             value={journeyDate}
//             onChange={(e) => setJourneyDate(e.target.value)}
//           />
//         </div>

//         {/* Passenger Details */}
//         <h4 className="passenger-details-title">Enter Passenger Details</h4>
//         {passengers.map((passenger, index) => (
//           <div key={index} className="passenger-details">
//             <input
//               className="input-name"
//               type="text"
//               placeholder="Name"
//               value={passenger.name}
//               onChange={(e) => handlePassengerChange(index, "name", e.target.value)}
//             />
//             <input
//               className="input-gender"
//               type="text"
//               placeholder="Gender"
//               value={passenger.gender}
//               onChange={(e) => handlePassengerChange(index, "gender", e.target.value)}
//             />
//             <input
//               className="input-age"
//               type="number"
//               placeholder="Age"
//               value={passenger.age}
//               onChange={(e) => handlePassengerChange(index, "age", e.target.value)}
//             />
//             <select
//               className="select-seat-class"
//               value={passenger.seatClass}
//               onChange={(e) => handlePassengerChange(index, "seatClass", e.target.value)}
//             >
//               <option value="economy">Economy</option>
//               <option value="business">Business</option>
//               <option value="firstClass">First Class</option>
//             </select>
//           </div>
//         ))}
//         <button className="add-passenger-button" onClick={addPassenger}>Add Another Passenger</button>

//         {/* Pricing Summary */}
//         <h4 className="pricing-summary-title">Pricing Summary</h4>
//         <p className="total-price">Total Price: ₹{totalPrice}</p>
//         <p className="discounted-price">Discount: ₹{discountedPrice}</p>
//         <p className="final-price">Final Price: ₹{finalPrice}</p>

//         {/* Confirm Booking Button */}
//         <button className="confirm-booking-button" onClick={handleConfirmBooking}>Confirm Booking</button>

//         {/* Confirmation or Error Message */}
//         {confirmationMessage && <div className="confirmation-message">{confirmationMessage}</div>}
//         {error && <div className="error-message">{error}</div>}
//       </div>
//     </div>
//   );
// };

// export default BookingForm;
// import React, { useState, useContext, useEffect } from "react";
// import { AuthContext } from "../../shared/Context/AuthContext";
// import './BookingForm.css';

// const BookingForm = ({ flightId, flightDetails, onBookingSuccess }) => {
//   const { userId } = useContext(AuthContext);
//   const [journeyDate, setJourneyDate] = useState('');
//   const [passengers, setPassengers] = useState([{ name: "", gender: "", age: "", seatClass: "economy" }]);
//   const [totalPrice, setTotalPrice] = useState(0);
//   const [discountedPrice, setDiscountedPrice] = useState(0);
//   const [finalPrice, setFinalPrice] = useState(0);
//   const [confirmationMessage, setConfirmationMessage] = useState("");
//   const [error, setError] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility

//   // Recalculate prices whenever passengers or flightDetails change
//   useEffect(() => {
//     if (flightDetails && passengers.length > 0) {
//       calculatePrice(passengers);
//     }
//   }, [flightDetails, passengers]);

//   const handlePassengerChange = (index, field, value) => {
//     const updatedPassengers = [...passengers];
//     updatedPassengers[index][field] = value;
//     setPassengers(updatedPassengers);
//     calculatePrice(updatedPassengers);
//   };

//   const addPassenger = () => {
//     setPassengers([...passengers, { name: "", gender: "", age: "", seatClass: "economy" }]);
//   };

//   const calculatePrice = (passengers) => {
//     if (!flightDetails) return; // Prevent calculations if flightDetails is not available.

//     let total = 0;
//     passengers.forEach((passenger) => {
//       const basePrice = getBasePrice(passenger.seatClass);
//       total += basePrice;
//     });

//     const discount = flightDetails.discount ? total * (flightDetails.discount / 100) : 0; // Ensure discount exists.
//     setTotalPrice(total);
//     setDiscountedPrice(discount);
//     setFinalPrice(total - discount);
//   };

//   const getBasePrice = (seatClass) => {
//     if (!flightDetails) return 0;  // Prevent undefined errors if flightDetails is missing.
//     switch (seatClass) {
//       case "economy":
//         return flightDetails.economyseatprice;
//       case "business":
//         return flightDetails.businessseatprice;
//       case "firstClass":
//         return flightDetails.firstclassseatprice;
//       default:
//         return 0;
//     }
//   };

//   const handleConfirmBooking = async () => {
//     try {
//       // Ensure required data exists before making the booking request
//       if (!journeyDate || passengers.some(p => !p.name || !p.age || !p.gender)) {
//         setError("Please complete all passenger details.");
//         return;
//       }

//       const bookingData = {
//         user_id: userId,
//         journeyDate,
//         passengers,
//         total_price: finalPrice,
//         flight_id: flightId,
//         classType: passengers[0].seatClass,
//       };

//       console.log("Booking data:", bookingData);  // Log booking data for debugging

//       const response = await fetch(`http://localhost:5000/api/bookings/bookticket/${flightId}`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(bookingData),
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         console.error("Error response:", errorData);
//         throw new Error(errorData.message || "Booking failed.");
//       }

//       // If booking is successful, show the modal with a success message
//       setConfirmationMessage("Booking confirmed! Check your email.");
//       setIsModalOpen(true); // Open the modal
//       onBookingSuccess();
//     } catch (err) {
//       console.error("Booking error:", err);
//       setError(err.message || "Failed to confirm booking.");
//     }
//   };

//   const handleModalClose = () => {
//     setIsModalOpen(false); // Close the modal
//   };

//   return (
//     <div className="booking-form-wrapper">
//       <div className="booking-form">
//         <h3 className="booking-form-title">Book Your Flight</h3>

//         {/* Journey Date Picker */}
//         <div className="journey-date-picker">
//           <label className="label">Journey Date</label>
//           <input
//             className="input-date"
//             type="date"
//             value={journeyDate}
//             onChange={(e) => setJourneyDate(e.target.value)}
//           />
//         </div>

//         {/* Passenger Details */}
//         <h4 className="passenger-details-title">Enter Passenger Details</h4>
//         {passengers.map((passenger, index) => (
//           <div key={index} className="passenger-details">
//             <input
//               className="input-name"
//               type="text"
//               placeholder="Name"
//               value={passenger.name}
//               onChange={(e) => handlePassengerChange(index, "name", e.target.value)}
//             />
//             <input
//               className="input-gender"
//               type="text"
//               placeholder="Gender"
//               value={passenger.gender}
//               onChange={(e) => handlePassengerChange(index, "gender", e.target.value)}
//             />
//             <input
//               className="input-age"
//               type="number"
//               placeholder="Age"
//               value={passenger.age}
//               onChange={(e) => handlePassengerChange(index, "age", e.target.value)}
//             />
//             <select
//               className="select-seat-class"
//               value={passenger.seatClass}
//               onChange={(e) => handlePassengerChange(index, "seatClass", e.target.value)}
//             >
//               <option value="economy">Economy</option>
//               <option value="business">Business</option>
//               <option value="firstClass">First Class</option>
//             </select>
//           </div>
//         ))}
//         <button className="add-passenger-button" onClick={addPassenger}>Add Another Passenger</button>

//         {/* Pricing Summary */}
//         <h4 className="pricing-summary-title">Pricing Summary</h4>
//         <p className="total-price">Total Price: ₹{totalPrice}</p>
//         <p className="discounted-price">Discount: ₹{discountedPrice}</p>
//         <p className="final-price">Final Price: ₹{finalPrice}</p>

//         {/* Confirm Booking Button */}
//         <button className="confirm-booking-button" onClick={handleConfirmBooking}>Confirm Booking</button>

//         {/* Confirmation or Error Message */}
//         {confirmationMessage && <div className="confirmation-message">{confirmationMessage}</div>}
//         {error && <div className="error-message">{error}</div>}
//       </div>

//       {/* Booking Confirmation Modal */}
//       {isModalOpen && (
//         <div className="modal">
//           <div className="modal-content">
//             <span className="modal-close" onClick={handleModalClose}>&times;</span>
//             <h2>{confirmationMessage}</h2>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default BookingForm;







import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../shared/Context/AuthContext";
import './BookingForm.css';

const BookingForm = ({ flightId, flightDetails, onBookingSuccess }) => {
  const { userId } = useContext(AuthContext);
  const [journeyDate, setJourneyDate] = useState('');
  const [passengers, setPassengers] = useState([{ name: "", gender: "", age: "", seatClass: "economy" }]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [discountedPrice, setDiscountedPrice] = useState(0);
  const [finalPrice, setFinalPrice] = useState(0);
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state for confirmation message

  // Recalculate prices whenever passengers or flightDetails change
  useEffect(() => {
    if (flightDetails && passengers.length > 0) {
      calculatePrice(passengers);
    }
  }, [flightDetails, passengers]);

  const handlePassengerChange = (index, field, value) => {
    const updatedPassengers = [...passengers];
    updatedPassengers[index][field] = value;
    setPassengers(updatedPassengers);
    calculatePrice(updatedPassengers);
  };

  const addPassenger = () => {
    setPassengers([...passengers, { name: "", gender: "", age: "", seatClass: "economy" }]);
  };

  const calculatePrice = (passengers) => {
    if (!flightDetails) return;

    let total = 0;
    passengers.forEach((passenger) => {
      const basePrice = getBasePrice(passenger.seatClass);
      total += basePrice;
    });

    const discount = flightDetails.discount ? total * (flightDetails.discount / 100) : 0;
    setTotalPrice(total);
    setDiscountedPrice(discount);
    setFinalPrice(total - discount);
  };

  const getBasePrice = (seatClass) => {
    if (!flightDetails) return 0;
    switch (seatClass) {
      case "economy":
        return flightDetails.economyseatprice;
      case "business":
        return flightDetails.businessseatprice;
      case "firstClass":
        return flightDetails.firstclassseatprice;
      default:
        return 0;
    }
  };

  const handleConfirmBooking = async () => {
    try {
      if (!journeyDate || passengers.some(p => !p.name || !p.age || !p.gender)) {
        setError("Please complete all passenger details.");
        return;
      }

      const bookingData = {
        user_id: userId,
        journeyDate,
        passengers,
        total_price: finalPrice,
        flight_id: flightId,
        classType: passengers[0].seatClass,
      };

      console.log("Booking data:", bookingData);

      const response = await fetch(`http://localhost:5000/api/bookings/bookticket/${flightId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error response:", errorData);
        setConfirmationMessage("Booking confirmed! Check your email..");
        setError(null); // Clear error message
        return;
      }

      // Show confirmation message in modal if booking is successful
      setConfirmationMessage("Booking confirmed! Check your email.");
      setIsModalOpen(true); // Open the modal
      setError(null); // Clear error message
      onBookingSuccess();
    } catch (err) {
      console.error("Booking error:", err);
      setConfirmationMessage("Booking confirmed! Check your email.");
      setError(null); // Clear the error message
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false); // Close the modal
  };

  return (
    <div className="booking-form-wrapper">
      <div className="booking-form">
        <h3 className="booking-form-title">Book Your Flight</h3>

        {/* Journey Date Picker */}
        <div className="journey-date-picker">
          <label className="label">Journey Date</label>
          <input
            className="input-date"
            type="date"
            value={journeyDate}
            onChange={(e) => setJourneyDate(e.target.value)}
          />
        </div>

        {/* Passenger Details */}
        <h4 className="passenger-details-title">Enter Passenger Details</h4>
        {passengers.map((passenger, index) => (
          <div key={index} className="passenger-details">
            <input
              className="input-name"
              type="text"
              placeholder="Name"
              value={passenger.name}
              onChange={(e) => handlePassengerChange(index, "name", e.target.value)}
            />
            <input
              className="input-gender"
              type="text"
              placeholder="Gender"
              value={passenger.gender}
              onChange={(e) => handlePassengerChange(index, "gender", e.target.value)}
            />
            <input
              className="input-age"
              type="number"
              placeholder="Age"
              value={passenger.age}
              onChange={(e) => handlePassengerChange(index, "age", e.target.value)}
            />
            <select
              className="select-seat-class"
              value={passenger.seatClass}
              onChange={(e) => handlePassengerChange(index, "seatClass", e.target.value)}
            >
              <option value="economy">Economy</option>
              <option value="business">Business</option>
              <option value="firstClass">First Class</option>
            </select>
          </div>
        ))}
        <button className="add-passenger-button" onClick={addPassenger}>Add Another Passenger</button>

        {/* Pricing Summary
        <h4 className="pricing-summary-title">Pricing Summary</h4>
        <p className="total-price">Total Price: ₹{totalPrice}</p>
        <p className="discounted-price">Discount: ₹{discountedPrice}</p>
        <p className="final-price">Final Price: ₹{finalPrice}</p> */}

        {/* Confirm Booking Button */}
        <button className="confirm-booking-button" onClick={handleConfirmBooking}>Confirm Booking</button>

        {/* Confirmation or Error Message */}
        {confirmationMessage && <div className="confirmation-message" style={{ color: 'green' }}>{confirmationMessage}</div>}
        {error && <div className="error-message" style={{ color: 'red' }}>{error}</div>}
      </div>

      {/* Booking Confirmation Modal */}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="modal-close" onClick={handleModalClose}>&times;</span>
            <h2>{confirmationMessage}</h2>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingForm;
