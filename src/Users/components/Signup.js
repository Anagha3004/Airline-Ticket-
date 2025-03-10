import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../shared/Context/AuthContext';
import './Signup.css';

const Signup = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        mobile: '',
        role: 'customer',
    });
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const auth = useContext(AuthContext);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');

        try {
            const response = await axios.post('http://localhost:5000/api/users/signup', formData, {
                headers: { 'Content-Type': 'application/json' },
            });
            setMessage(response.data.message);

            const { token, userId, role } = response.data;
            auth.login(userId, role, token);

            navigate('/login');
        } catch (err) {
            setError(err.response?.data?.message || 'Signup failed. Please try again.');
        }
    };

    const handleGoToLogin = () => {
        navigate('/login');
    };

    return (
        <div className="auth-background signup-container">
            <div className="signup">
                <h2>Signup</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Mobile</label>
                        <input
                            type="text"
                            name="mobile"
                            value={formData.mobile}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Role</label>
                        <select name="role" value={formData.role} onChange={handleChange}>
                            <option value="customer">Customer</option>
                        </select>
                    </div>
                    <button type="submit" className="button">Signup</button>
                </form>
                
                {error && <p className="error-text">{error}</p>}
                {message && <p className="success-text">{message}</p>}
                
                <button
                    className="switch-button"
                    onClick={handleGoToLogin}
                >
                    Go to Login
                </button>
            </div>
        </div>
    );
};

export default Signup;
