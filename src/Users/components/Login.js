import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../shared/Context/AuthContext';
import './Login.css';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        serviceCode: '',
    });
    const [isServiceProvider, setIsServiceProvider] = useState(false);
    const navigate = useNavigate();
    const auth = useContext(AuthContext);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleServiceProviderToggle = () => {
        setIsServiceProvider(!isServiceProvider);
        setFormData({ ...formData, serviceCode: '' });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const endpoint = 'http://localhost:5000/api/users/login';
            const response = await axios.post(endpoint, formData);

            alert(response.data.message);

            const { token, userId, role, serviceCode } = response.data;

            localStorage.setItem('token', token);
            if (role === 'serviceProvider') {
                localStorage.setItem('serviceCode', serviceCode);
            }

            auth.login(userId, role, token);

            if (role === 'admin') {
                navigate('/admin-dashboard');
            } else if (role === 'serviceProvider') {
                navigate('/airlinepage');
            } else if (role === 'customer') {
                navigate('/customer-dashboard');
            }
        } catch (error) {
            alert(error.response?.data?.message || 'Login failed');
        }
    };

    const handleLogout = () => {
        if (window.confirm("Are you sure you want to logout?")) {
            localStorage.removeItem('token');
            localStorage.removeItem('serviceCode');
            auth.logout();
            navigate('/login');
        }
    };

    useEffect(() => {
        setTimeout(() => {
            const form = document.querySelector('.authentication');
            form.classList.add('slide-in'); // Add slide-in class after mount
        }, 100);
    }, []);

    return (
        <div className="auth-background">
            <div className="authentication login-card">
                <h2>{isServiceProvider ? 'Service Provider Login' : 'Login'}</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        onChange={handleChange}
                        required
                    />
                    {isServiceProvider && (
                        <input
                            type="text"
                            name="serviceCode"
                            placeholder="Service Code"
                            onChange={handleChange}
                            required
                        />
                    )}
                    <button type="submit" className="button">Login</button>
                </form>
                <button className="toggle-btn button" onClick={handleServiceProviderToggle}>
                    {isServiceProvider ? 'Login as Customer' : 'Login as Service Provider'}
                </button>
                <p>Don't have an account? <Link to="/signup">Signup</Link></p>
            </div>
        </div>
    );
};

export default Login;
