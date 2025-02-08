// src/pages/authentication/AdminSignin.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminSignin = () => {
    const [admin, setAdmin] = useState({
        email: "",
        password: "",
    });
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setAdmin({ ...admin, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:8000/api/admin/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(admin),
            });
            const data = await response.json();
            if (response.ok) {
                localStorage.setItem("adminToken", data.token);
                setMessage("Login successful");
                // Redirect to an admin dashboard or any other admin page:
                navigate("/admin-dashboard");
            } else {
                setMessage(data.message || "Login failed");
            }
        } catch (error) {
            setMessage("Error: " + error.message);
        }
    };

    return (
        <div>
            <h2>Admin Login</h2>
            {message && <p>{message}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={admin.email}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={admin.password}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default AdminSignin;

