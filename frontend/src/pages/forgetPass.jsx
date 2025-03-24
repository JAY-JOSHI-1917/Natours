import React, { useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../utils/config';
import '../styles/forgetPass.css';

const ForgetPass = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isEmailValid, setIsEmailValid] = useState(false);
    const [message, setMessage] = useState('');

    const checkEmail = async () => {
        try {
            // console.log(email);
            const response = await fetch(`${BASE_URL}/users/checkEmail/${email}`);

            if (!response.ok) {
                throw new Error('An error occurred. Please try again.');
            }

            const data = await response.json();

            if (data.exists) {
                setIsEmailValid(true);
                alert("Your mail id is found ✅...")
                // alert("Now You are able to update the password")
                // setMessage('Email exists. You can now update your password.');
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
            console.log(email)
            console.log(password)
            const response = await fetch(`${BASE_URL}/users/updatePassword/${email}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ password }),
            });
            // await ('/users/update-password', { email, password });

            const data = await response.json();
            console.log(response)

            if (data.success) {
                setIsEmailValid(true);
                alert("Your Password successfully updated ... ✅")

                window.location.href = "/login"
                // setMessage('Password updated successfully.');
            } else {
                setIsEmailValid(false);
                setMessage('Email does not exist.');
            }
        } catch (error) {
            setMessage('An error occurred. Please try again.');
        }
    };

    return (
        <div className="forget-pass-container">
            <div className='forget-pass'>
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
                {message && <h4>{message}</h4>}
            </div>
        </div>
    );
};

export default ForgetPass;