import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook
import FlightList from "../../Flights/components/FlightList";

const FlightUser = () => {
    const [loadedFlights, setLoadedFlights] = useState([]); // Initialize as empty array
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // Initialize navigate hook

    useEffect(() => {
        const sendRequest = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/flights/allflights");
                const responseData = await response.json();
                console.log("Flight Data from API:", responseData);
    
                if (!response.ok) {
                    throw new Error(responseData.message || "Failed to fetch flights.");
                }
    
                // Set loadedFlights to the flights array within responseData
                setLoadedFlights(responseData.flights);
            } catch (err) {
                setError(err.message || "Something went wrong!");
            }
        };
    
        sendRequest();
    }, []);
    
    // Function to handle the back navigation
    const handleBackClick = () => {
        navigate("/customer-dashboard"); // Navigate back to the Customer Dashboard
    };

    return (
        <div>
            <button onClick={handleBackClick}>Back to Dashboard</button>
            {loadedFlights && loadedFlights.length > 0 ? (
                <FlightList items={loadedFlights} />
            ) : (
                <div>Loading flights... or No Flights found</div>
            )}
            {error && <div>{error}</div>}
        </div>
    );
};

export default FlightUser;