import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:5001/users/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        });
        if (response.ok) {
            const { token } = await response.json();
            localStorage.setItem('token', token); // Store the token
            const loginEvent = new Event('authChange');
            window.dispatchEvent(loginEvent);
            navigate('/profile'); // Redirect to Profile
        } else {
            alert('Sign in failed!');
        }
    };

    return (
        <section className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-600 to-green-200 p-8">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                <h2 className="text-4xl font-extrabold text-black mb-6 text-center">
                    Sign In
                </h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter your username"
                        className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        className="w-full p-3 mb-6 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <button
                        type="submit"
                        className="w-full p-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition duration-300"
                    >
                        Sign In
                    </button>
                </form>
                <p className="text-center mt-4 text-black">
                    Don't have an account? <a href="/signup" className="text-green-600">Sign Up</a>
                </p>
            </div>
        </section>
    );
};

export default SignIn;
