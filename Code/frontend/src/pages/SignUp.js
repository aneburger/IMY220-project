/* Ane' Burger 24565068, 33 */

import React from "react";
import { useState } from 'react';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import '../../public/assets/style/css/splash.css';

const SignUp = () => {          
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        surname: '',
        email: '',
        password: ''
    });
    const initialFormState = {
        username: '',
        surname: '',
        email: '',
        password: ''
    }

    const [errors, setErrors] = useState({});

    const validateForm = (data) => {
        let newErrors = {};
        if (!data.username) {
            newErrors.username = 'Username is required';
        } else if (!/^(?!.*'{2})[A-Za-z\s'-]+$/.test(data.username)) {
            newErrors.username = 'Invalid username, only letters allowed.';
        }

        if (!data.surname) {
            newErrors.surname = 'Surname is required';
        } else if (!/^(?!.*'{2})[A-Za-z\s'-]+$/.test(data.surname)) {
            newErrors.surname = 'Invalid surname, only letters allowed.';
        }

        if (!data.email) {
            newErrors.email = 'Email is required';
        } else if (!/^(?!.*'{2})([-!#-'*+/-9=?A-Z^-~]+(\.[-!#-'*+/-9=?A-Z^-~]+)*|"([]!#-[^-~ \t]|(\\[\t -~]))+")@([0-9A-Za-z]([0-9A-Za-z-]{0,61}[0-9A-Za-z])?(\.[0-9A-Za-z]([0-9A-Za-z-]{0,61}[0-9A-Za-z])?)*|\[((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|IPv6:((((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){6}|::((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){5}|[0-9A-Fa-f]{0,4}::((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){4}|(((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):)?(0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}))?::((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){3}|(((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){0,2}(0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}))?::((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){2}|(((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){0,3}(0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}))?::(0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):|(((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){0,4}(0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}))?::)((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):(0|[1-9A-Fa-f][0-9A-Fa-f]{0,3})|(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3})|(((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){0,5}(0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}))?::(0|[1-9A-Fa-f][0-9A-Fa-f]{0,3})|(((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){0,6}(0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}))?::)|(?!IPv6:)[0-9A-Za-z-]*[0-9A-Za-z]:[!-Z^-~]+)])/.test(data.email)) {
            newErrors.email = 'Invalid email format. E.g. exam@ple.com';
        }

        if (!data.password) {
            newErrors.password = 'Password is required';
        } else if (data.password.length < 8 && !/^(?!.*\'{2})(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{9,}$/.test(data.password)) {
            newErrors.password = 'Password must be at least 8 characters, contain upper and lowercase letters, atleast one digit and one symbol.';
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
        <div className="signupBody">
            <div className="glass-card2">
                <h1 id="signUpHead">Sign Up</h1>
                <form onSubmit={handleSubmit} action="/home" method="post">
                    <label htmlFor="username">Username: *</label>
                    <input type="text" name="username" id="username2" placeholder="Username" autoComplete="username"
                            value={formData.username}
                            onChange={handleChange}
                            onBlur={handleChange}/>
                    {errors.username && <p id="usernameError">{errors.username}</p>}

                    <label htmlFor="surname">Surname: *</label>
                    <input type="text" name="surname" id="surname" placeholder="Surname" autoComplete="surname"
                            value={formData.surname}
                            onChange={handleChange}
                            onBlur={handleChange}/>
                    {errors.surname && <p id="surnameError">{errors.surname}</p>}

                    <label htmlFor="email">Email: *</label>
                    <input type="email" id="email" name="email" placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            onBlur={handleChange}/>
                    {errors.email && <p id="emailError">{errors.email}</p>}

                    <label htmlFor="password">Password: *</label>
                    <input type="password" id="password2" name="password" placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            onBlur={handleChange}/>
                    {errors.password && <p id="passwordError">{errors.password}</p>}

                    <div id="signUpBdiv">
                        <button id="clear" onClick={clearForm}>Clear</button>
                        <input id="signUpB" type="submit" value="Sign Up"/>
                    </div>

                </form>
            </div>
        </div>
    );
}

export default SignUp;