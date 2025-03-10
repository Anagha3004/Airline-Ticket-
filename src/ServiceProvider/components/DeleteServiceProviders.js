import React, { useState, useEffect } from "react";
// import './DeleteServiceProviders.css';

const DeleteServiceProvider = () => {
    const [serviceProviders, setServiceProviders] = useState([]);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Fetch service providers data from the backend
        const fetchServiceProviders = async () => {
            setLoading(true);
            try {
                const response = await fetch('http://localhost:5000/api/users/getserviceproviders');
                const data = await response.json();
                setServiceProviders(data);
            } catch (error) {
                setMessage("Failed to fetch service providers.");
            }
            setLoading(false);
        };
        fetchServiceProviders();
    }, []);

    const deleteServiceProvider = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/api/users/deleteserviceprovider/${id}`, {
                method: 'DELETE',
            });

            const responseData = await response.json();
            if (!response.ok) {
                throw new Error(responseData.message || 'Failed to delete service provider.');
            }

            setMessage('Service provider deleted successfully!');
            setServiceProviders(serviceProviders.filter(provider => provider.id !== id));
        } catch (error) {
            setMessage(error.message);
        }
    };

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this service provider?")) {
            deleteServiceProvider(id);
        }
    };

    return (
        <div className="delete-service-provider-container">
            <h2 className="header">Manage Service Providers</h2>
            {message && <p className="message">{message}</p>}
            {loading ? (
                <div className="loader">Loading...</div>
            ) : (
                <ul className="service-provider-list">
                    {serviceProviders.map((provider) => (
                        <li key={provider.id} className="service-provider-item">
                            <div className="provider-info">
                                <h3>{provider.name}</h3>
                                <p>{provider.email}</p>
                                <button
                                    className="delete-button"
                                    onClick={() => handleDelete(provider.id)}
                                >
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default DeleteServiceProvider;
