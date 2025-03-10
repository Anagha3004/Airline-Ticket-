import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './EditServiceProvider.css';

const ServiceProviderList = () => {
    const [serviceProviders, setServiceProviders] = useState([]);
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchServiceProviders = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/users/serviceproviders');
                const responseData = await response.json();

                if (!response.ok) {
                    throw new Error(responseData.message || 'Failed to fetch service providers.');
                }

                setServiceProviders(responseData.serviceProviders);
            } catch (error) {
                setMessage(error.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchServiceProviders();
    }, []);

    const handleDelete = async (id) => {
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

    return (
        <div className="main-container">
            <header className="full-width-header">
                <h2 className="header-title">Service Providers</h2>
            </header>

            <div className="service-provider-list-container">
                {message && <p className="message">{message}</p>}
                {isLoading ? (
                    <p className="loading">Loading...</p>
                ) : (
                    <ul className="list">
                        {serviceProviders.map((provider) => (
                            <li key={provider.id} className="list-item">
                                <div className="provider-info">
                                    <p className="provider-name">{provider.name}</p>
                                    <p className="provider-email">{provider.email}</p>
                                </div>
                                <button
                                    className="delete-button"
                                    onClick={() => handleDelete(provider.id)}
                                >
                                    Delete
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
                <div className="add-button-container">
                    <Link to={`/newsp`}>
                        <button className="add-button">Add Service Provider</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ServiceProviderList;
