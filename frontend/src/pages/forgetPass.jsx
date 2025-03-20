import React, { useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../utils/config';

const ForgetPass = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isEmailValid, setIsEmailValid] = useState(false);
    const [message, setMessage] = useState('');

    const checkEmail = async () => {
        try {
            const response = await fetch(`${BASE_URL}/users/check-email/${email}`, {
                method: 'GET'
            });

            if (!response.ok) {
                throw new Error('An error occurred. Please try again.');
            }

            const data = await response.json();

            if (data.exists) {
                setIsEmailValid(true);
                setMessage('Email exists. You can now update your password.');
            } else {
                setIsEmailValid(false);
                setMessage('Email does not exist.');
            }
        } catch (error) {
            setMessage(error.message);
        }
    };


    const updatePassword = async () => {
        if (password !== confirmPassword) {
            setMessage('Passwords do not match.');
            return;
        }

        try {
            await axios.post('/api/update-password', { email, password });
            setMessage('Password updated successfully.');
        } catch (error) {
            setMessage('An error occurred. Please try again.');
        }
    };

    return (
        <div>
            <h2>Forget Password</h2>
            <div>
                <label>Email:</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <button onClick={checkEmail}>Check Email</button>
            </div>
            {isEmailValid && (
                <div>
                    <label>New Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <label>Confirm Password:</label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <button onClick={updatePassword}>Update Password</button>
                </div>
            )}
            {message && <p>{message}</p>}
        </div>
    );
};

export default ForgetPass;