import React from "react";
import { Link } from "react-router-dom";

const FlightItem = (props) => {
    return (
        <tr>
            <td>
                <Link to={`/flights/${props.id}`}>{props.name}</Link>
            </td>
            <td>{props.departure_airport}</td>
            <td>{props.arrival_airport}</td>
            <td>{props.departure_time}</td>
            <td>{props.arrival_time}</td>
            <td>
                <Link to={`/flights/${props.id}`}>
                    <button>View Details</button>
                </Link>
            </td>
        </tr>
    );
};

export default FlightItem;
