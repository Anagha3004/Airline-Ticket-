import React, { useEffect, useState } from "react";
import "./Card.css";

const Card = (props) => {
  const [isVisible, setIsVisible] = useState(false);

  // Trigger animation on component mount
  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  return (
    <div
      className={`card ${isVisible ? "slide-in" : ""} ${props.className} ${
        props.isCenter ? "center-card" : ""
      }`}
      style={props.style}
    >
      {props.children}
    </div>
  );
};

export default Card;

