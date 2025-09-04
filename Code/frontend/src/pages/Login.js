/* Ane' Burger 24565068, 33 */

import React from "react";
import { Link } from "react-router-dom";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../public/assets/style/css/loginSignup.css';

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const initialFormState = {
        username: '',
        password: ''
    }
    
    const [errors, setErrors] = useState({});

    const validateForm = (data) => {
        let newErrors = {};
        if (!data.username) {
            newErrors.username = 'Username is required';
        } else if (data.username != 'test user') {
            newErrors.username = 'Username invalid.';
        }

        if (!data.password) {
            newErrors.password = 'Password is required';
        } else if (data.password != '12345@Aa') {
            newErrors.password = 'Password invalid.';
        }

        return newErrors;
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        const newErrors = validateForm({ ...formData, [name]: value }); 
        setErrors(newErrors);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validateForm(formData);
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            console.log('Form submitted:', formData);
            navigate('/home');
        }
    };

    const clearForm = () => {
        setFormData(initialFormState);
    }

    return (
        <div className="loginBody">
            <div className="glass-card">
                <h1 id="loginHead">Login</h1>
                <form onSubmit={handleSubmit} action="/home" method="post">
                    <label htmlFor="username">Username: *</label>
                    <input type="text" name="username" id="username"  placeholder="Username" autoComplete="username"
                            value={formData.username}
                            onChange={handleChange}
                            onBlur={handleChange}/>
                    {errors.username && <p id="usernameError">{errors.username}</p>}

                    <label htmlFor="password">Password: *</label>
                    <input type="password" id="password" name="password" placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            onBlur={handleChange}/>
                    {errors.password && <p id="passwordError">{errors.password}</p>}

                    <div id="loginBdiv">
                        <button id="clear" onClick={clearForm}>Clear</button>
                        <input id="loginB" type="submit" value="Login"/>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;