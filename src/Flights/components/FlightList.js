import React, { useState, useEffect } from "react";
import './FlightList.css';
import Card from '../../shared/UIElements/Card';
import FlightItem from "./FlightItem";

const FlightList = (props) => {
    const [flights, setFlights] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [sortDirection, setSortDirection] = useState("asc");

    // Simulate data fetching
    useEffect(() => {
        // Replace with actual API call
        setTimeout(() => {
            setFlights(props.items);
            setIsLoading(false);
        }, 1000);
    }, [props.items]);

    const handleSort = (field) => {
        const sortedFlights = [...flights];
        sortedFlights.sort((a, b) => {
            if (sortDirection === "asc") {
                return a[field] < b[field] ? -1 : 1;
            } else {
                return a[field] > b[field] ? -1 : 1;
            }
        });
        setSortDirection(sortDirection === "asc" ? "desc" : "asc");
        setFlights(sortedFlights);
    };

    if (isLoading) {
        return (
            <div className="loading-spinner">
                <div className="spinner"></div>
                <p>Loading flights...</p>
            </div>
        );
    }

    if (!flights || flights.length === 0) {
        return (
            <div className="center">
                <h2>No Flights found...</h2>
            </div>
        );
    }

    return (
        <div className="flight-list-container">
            <Card className="employee-list__content">
                <table className="employee-list__table">
                    <thead>
                        <tr>
                            <th onClick={() => handleSort("name")}>Name</th>
                            <th onClick={() => handleSort("departure_time")}>Departure Time</th>
                            <th>Departure Airport</th>
                            <th>Arrival Airport</th>
                            <th>Arrival Time</th>
                            <th>Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {flights.map((flight) => (
                            <FlightItem
                                key={flight.id}
                                id={flight.id}
                                name={flight.name}
                                departure_airport={flight.departure_airport}
                                arrival_airport={flight.arrival_airport}
                                departure_time={flight.departure_time}
                                arrival_time={flight.arrival_time}
                            />
                        ))}
                    </tbody>
                </table>
            </Card>
            {/* <div className="center">
                <button>Add Flight</button>
            </div> */}
        </div>
    );
};

export default FlightList;
