import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';
import TopBar from '../../shared/topbar/topbar';
import Card from '../../shared/UIElements/Card';
import axios from 'axios';

// Import images directly
import image1 from '../../shared/Images/293397.jpg';
import image2 from '../../shared/Images/84622.jpg';
import image3 from '../../shared/Images/900529.jpg';

const reviews = [
  {
    name: "Alice Johnson",
    rating: 5,
    description: "Amazing flight experience! The staff were incredibly helpful, and the service was top-notch."
  },
  {
    name: "Bob Smith",
    rating: 4,
    description: "Comfortable seats and on-time departure. Would definitely fly again!"
  },
  {
    name: "Charlie Brown",
    rating: 3,
    description: "Average experience. The food could be better, but overall it was fine."
  },
  {
    name: "Alice Johnson",
    rating: 5,
    description: "Amazing flight experience! The staff were incredibly helpful, and the service was top-notch."
  },
];

const slideshowImages = [image1, image2, image3];

const HomePage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slideshowImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleViewFlights = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get('http://localhost:5000/api/flights/allflightsdetails');
      const flightData = response.data.flights.map(flight => ({
        id: flight.flight._id,
        name: flight.flight.name,
        airline: flight.flight.airline_id.name,
        departureAirport: flight.flight.departure_airport,
        arrivalAirport: flight.flight.arrival_airport,
        departureTime: new Date(flight.flight.departure_time).toLocaleString(),
        arrivalTime: new Date(flight.flight.arrival_time).toLocaleString(),
        travelDuration: flight.flight.travel_duration,
        economyPrice: flight.details.economyseatprice,
        businessPrice: flight.details.businessseatprice,
        firstClassPrice: flight.details.firstclassseatprice
      }));
      setFlights(flightData);
    } catch (err) {
      setError('Could not fetch flights. Please try again later.');
      console.error('Error fetching flights:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="homepage">
      {/* Slideshow Section */}
      <div className="slideshow">
        {slideshowImages.map((image, index) => (
          <div
            key={index}
            className={`slide ${index === currentSlide ? 'active' : ''}`}
            style={{ backgroundImage: `url(${image})` }}
          >
            <div className="slide-text">
              <h1>Ready to take off?</h1>
            </div>
          </div>
        ))}
      </div>

      {/* Available Flights Button */}
      <div className="overlay">
        <button onClick={handleViewFlights} className="view-flights-button">See Available Flights</button>
        {loading && <p>Loading flights...</p>}
        {error && <p>{error}</p>}
      </div>

      {/* Available Flights List within Cards */}
      {flights.length > 0 && (
        <div className="flights-list">
          <h2>Available Flights</h2>
          <div className="flight-cards">
            {flights.map(flight => (
              <Card key={flight.id} className="flight-card">
                <div className="flight-card-body">
                  <h3>{flight.name} ({flight.airline})</h3>
                  <p>From {flight.departureAirport} to {flight.arrivalAirport}</p>
                  <p>Departure: {flight.departureTime}</p>
                  <p>Arrival: {flight.arrivalTime}</p>
                  <p>Duration: {flight.travelDuration} hours</p>
                  <p>Economy Class Price: ₹{flight.economyPrice}</p>
                  <p>Business Class Price: ₹{flight.businessPrice}</p>
                  <p>First Class Price: ₹{flight.firstClassPrice}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Customer Reviews Section */}
      <div className="user-reviews">
        <h2>What Users Say About Flights</h2>
        <div className="review-cards">
          {reviews.map((review, index) => (
            <Card key={index} className="review-card">
              <h3>{review.name}</h3>
              <div className="rating">
                {Array.from({ length: 5 }, (_, i) => (
                  <span key={i} className={i < review.rating ? 'star filled' : 'star'}>★</span>
                ))}
              </div>
              <p>{review.description}</p>
            </Card>
          ))}
        </div>
      </div>

      {/* Contact Information Section */}
      <div className="contact-info">
        <h2>Contact Us</h2>
        <p>If you have any questions or need assistance, feel free to reach out to us!</p>
        <ul>
          <li>Email: support@ticketmanagement.com</li>
          <li>Phone: +1 (123) 456-7890</li>
          <li>Address: 1234 Ticket Lane, Flight City, FL 56789</li>
        </ul>
      </div>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} Ticket Management System</p>
      </footer>
    </div>
  );
};

export default HomePage;



 
// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import './HomePage.css';
// import TopBar from '../../shared/topbar/topbar';
// import Card from '../../shared/UIElements/Card';
// import axios from 'axios';

// // Import images directly
// import image1 from '../../shared/Images/293397.jpg';
// import image2 from '../../shared/Images/84622.jpg';
// import image3 from '../../shared/Images/900529.jpg';

// const reviews = [
//   {
//     name: "Alice Johnson",
//     rating: 5,
//     description: "Amazing flight experience! The staff were incredibly helpful, and the service was top-notch."
//   },
//   {
//     name: "Bob Smith",
//     rating: 4,
//     description: "Comfortable seats and on-time departure. Would definitely fly again!"
//   },
//   {
//     name: "Charlie Brown",
//     rating: 3,
//     description: "Average experience. The food could be better, but overall it was fine."
//   },
// ];

// const slideshowImages = [image1, image2, image3];

// const HomePage = () => {
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [flights, setFlights] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentSlide((prevSlide) => (prevSlide + 1) % slideshowImages.length);
//     }, 5000);

//     return () => clearInterval(interval);
//   }, []);

//   const handleViewFlights = async () => {
//     setLoading(true);
//     setError('');
//     try {
//       const response = await axios.get('http://localhost:5000/api/flights/allflightsdetails');
//       const flightData = response.data.flights.map(flight => ({
//         id: flight.flight._id,
//         name: flight.flight.name,
//         airline: flight.flight.airline_id.name,
//         departureAirport: flight.flight.departure_airport,
//         arrivalAirport: flight.flight.arrival_airport,
//         departureTime: new Date(flight.flight.departure_time).toLocaleString(),
//         arrivalTime: new Date(flight.flight.arrival_time).toLocaleString(),
//         travelDuration: flight.flight.travel_duration,
//         economyPrice: flight.details.economyseatprice,
//         businessPrice: flight.details.businessseatprice,
//         firstClassPrice: flight.details.firstclassseatprice
//       }));
//       setFlights(flightData);
//     } catch (err) {
//       setError('Could not fetch flights. Please try again later.');
//       console.error('Error fetching flights:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="homepage">
//       {/* Slideshow Section */}
//       <div className="slideshow">
//         {slideshowImages.map((image, index) => (
//           <div
//             key={index}
//             className={`slide ${index === currentSlide ? 'active' : ''}`}
//             style={{ backgroundImage: `url(${image})` }}
//           />
//         ))}
//       </div>

//       {/* Available Flights Button */}
//       <div className="overlay">
//         <h1>Ready to take off?</h1>
//         <button onClick={handleViewFlights} className="view-flights-button">See Available Flights</button>
//         {loading && <p>Loading flights...</p>}
//         {error && <p>{error}</p>}
//       </div>

//       {/* Available Flights List within Cards */}
//       {flights.length > 0 && (
//         <div className="flights-list">
//           <h2>Available Flights</h2>
//           <div className="flight-cards">
//             {flights.map(flight => (
//               <Card key={flight.id} className="flight-card">
//                 <h3>{flight.name} ({flight.airline})</h3>
//                 <p>From {flight.departureAirport} to {flight.arrivalAirport}</p>
//                 <p>Departure: {flight.departureTime}</p>
//                 <p>Arrival: {flight.arrivalTime}</p>
//                 <p>Duration: {flight.travelDuration} hours</p>
//                 <p>Economy Class Price: ₹{flight.economyPrice}</p>
//                 <p>Business Class Price: ₹{flight.businessPrice}</p>
//                 <p>First Class Price: ₹{flight.firstClassPrice}</p>
//               </Card>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* Customer Reviews Section */}
//       <div className="user-reviews">
//         <h2>What Users Say About Flights</h2>
//         <div className="review-cards">
//           {reviews.map((review, index) => (
//             <Card key={index} className="review-card">
//               <h3>{review.name}</h3>
//               <div className="rating">
//                 {Array.from({ length: 5 }, (_, i) => (
//                   <span key={i} className={i < review.rating ? 'star filled' : 'star'}>★</span>
//                 ))}
//               </div>
//               <p>{review.description}</p>
//             </Card>
//           ))}
//         </div>
//       </div>

//       {/* Contact Information Section */}
//       <div className="contact-info">
//         <h2>Contact Us</h2>
//         <p>If you have any questions or need assistance, feel free to reach out to us!</p>
//         <ul>
//           <li>Email: support@ticketmanagement.com</li>
//           <li>Phone: +1 (123) 456-7890</li>
//           <li>Address: 1234 Ticket Lane, Flight City, FL 56789</li>
//         </ul>
//       </div>

//       {/* Footer */}
//       <footer className="footer">
//         <p>&copy; {new Date().getFullYear()} Ticket Management System</p>
//       </footer>
//     </div>
//   );
// };

// export default HomePage;
