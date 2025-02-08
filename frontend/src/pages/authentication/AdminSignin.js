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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(admin),
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("adminToken", data.token);
        setMessage("Login successful");
        navigate("/admin-dashboard"); // Adjust if needed
      } else {
        setMessage(data.message || "Login failed");
      }
    } catch (error) {
      setMessage("Error: " + error.message);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
      <div className="card shadow" style={{ width: "400px" }}>
        <div className="card-body">
          <h3 className="card-title text-center mb-4">Admin Login</h3>
          {message && <div className="alert alert-info">{message}</div>}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email Address</label>
              <input type="email" className="form-control" id="email" name="email" value={admin.email} onChange={handleChange} required placeholder="Enter email" />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input type="password" className="form-control" id="password" name="password" value={admin.password} onChange={handleChange} required placeholder="Enter password" />
            </div>
            <button type="submit" className="btn btn-primary w-100">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminSignin;
