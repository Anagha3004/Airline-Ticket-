import React, { useEffect, useState } from "react";
import FlightList from "../components/FlightList";

const Flight = () => {
    const [loadedFlights, setLoadedFlights] = useState([]); // Initialize as empty array
    const [error, setError] = useState(null);

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
    
    

    return (
        <div>
            {loadedFlights && loadedFlights.length > 0 ? (
                <FlightList items={loadedFlights} />
            ) : (
                <div>Loading flights... or No Flights found</div>
            )}
            {error && <div>{error}</div>}
        </div>
    );
};

export default Flight;
