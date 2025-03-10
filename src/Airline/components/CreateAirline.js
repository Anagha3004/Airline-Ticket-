import React, { useState } from 'react';
import './CreateAirline.css';

const CreateAirline = () => {
    const [name, setName] = useState('');
    const [serviceCode, setServiceCode] = useState(''); // New state for serviceCode
    const [message, setMessage] = useState('');

    const handleCreateAirline = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/flights/createAirline', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: Date.now(), name, serviceCode }) // Include serviceCode in the request body
            });

            const responseData = await response.json();

            if (!response.ok) throw new Error(responseData.message || 'Failed to create airline.');
            setMessage('Airline created successfully!');
        } catch (error) {
            setMessage(error.message);
        }
    };

    return (
        <div className="create-airline-background">
            <div className="create-airline-box">
                <h2>Create Airline</h2>
                {message && <p className={message.includes('success') ? 'success-message' : 'error-message'}>{message}</p>}
                <input
                    type="text"
                    className="input-field"
                    placeholder="Airline Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="text"
                    className="input-field"
                    placeholder="Service Code"
                    value={serviceCode}
                    onChange={(e) => setServiceCode(e.target.value)}
                />
                <button className="create-button" onClick={handleCreateAirline}>Create Airline</button>
            </div>
        </div>
    );
};

export default CreateAirline;
