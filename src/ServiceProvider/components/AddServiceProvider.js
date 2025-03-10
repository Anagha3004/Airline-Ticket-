import React, { useState } from 'react';
import './AddServiceProvider.css';

const AddServiceProvider = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [mobile, setMobile] = useState('');
    const [message, setMessage] = useState('');

    const addServiceProvider = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/users/newsp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password, mobile }),
            });
            
            const responseData = await response.json();

            if (!response.ok) {
                throw new Error(responseData.message || 'Failed to add service provider.');
            }

            setMessage('Service provider added successfully!');
            setName('');
            setEmail('');
            setPassword('');
            setMobile('');
        } catch (error) {
            setMessage(error.message);
        }
    };

    return (
        <div className="add-service-provider-container">
            <div className="add-service-container">
                <h2 className="header">Add Service Provider</h2>
                {message && <p className="message">{message}</p>}
                <form onSubmit={addServiceProvider} className="form">
                    <input 
                        type="text" 
                        placeholder="Name" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                        className="input"
                        required 
                    />
                    <input 
                        type="email" 
                        placeholder="Email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        className="input"
                        required 
                    />
                    <input 
                        type="password" 
                        placeholder="Password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        className="input"
                        required 
                    />
                    <input 
                        type="text" 
                        placeholder="Mobile" 
                        value={mobile} 
                        onChange={(e) => setMobile(e.target.value)} 
                        className="input"
                        required 
                    />
                    <button type="submit" className="button">Add Service Provider</button>
                </form>
            </div>
        </div>
    );
};

export default AddServiceProvider;
