import React, { useState } from "react";
import API from "../services/api";

function EmployeeForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    department: "",
    skills: "",
    performanceScore: "",
    experience: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/employees", {
        ...form,
        skills: form.skills.split(",")
      });

      alert("Employee added!");
      setForm({
        name: "",
        email: "",
        department: "",
        skills: "",
        performanceScore: "",
        experience: ""
      });

    } catch (error) {
      alert("Error adding employee");
    }
  };

  const inputStyle = {
    width: "100%",
    padding: "8px",
    margin: "5px 0",
    borderRadius: "6px",
    border: "1px solid #ccc"
  };

  const buttonStyle = {
    width: "100%",
    padding: "10px",
    marginTop: "10px",
    borderRadius: "6px",
    border: "none",
    background: "#667eea",
    color: "white",
    cursor: "pointer"
  };

  return (
    <div style={{
      background: "white",
      padding: "20px",
      borderRadius: "12px",
      width: "300px",
      marginBottom: "20px",
      color: "black",
      boxShadow: "0 5px 15px rgba(0,0,0,0.2)"
    }}>
      <h3 style={{ textAlign: "center" }}>Add Employee</h3>

      <form onSubmit={handleSubmit}>
        <input name="name" value={form.name} placeholder="Name" onChange={handleChange} style={inputStyle} />
        <input name="email" value={form.email} placeholder="Email" onChange={handleChange} style={inputStyle} />
        <input name="department" value={form.department} placeholder="Department" onChange={handleChange} style={inputStyle} />
        <input name="skills" value={form.skills} placeholder="Skills (comma separated)" onChange={handleChange} style={inputStyle} />
        <input name="performanceScore" value={form.performanceScore} placeholder="Score" onChange={handleChange} style={inputStyle} />
        <input name="experience" value={form.experience} placeholder="Experience" onChange={handleChange} style={inputStyle} />

        <button style={buttonStyle}>Add Employee</button>
      </form>
    </div>
  );
}

export default EmployeeForm;