import React, { useEffect, useState } from "react";
import API from "../services/api";

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");
  const [aiResult, setAiResult] = useState(null);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    const res = await API.get("/employees");
    setEmployees(res.data);
  };

  const handleSearch = async () => {
    const res = await API.get(`/employees/search?department=${search}`);
    setEmployees(res.data);
  };

  const deleteEmployee = async (id) => {
    await API.delete(`/employees/${id}`);
    fetchEmployees();
  };

  const getAIRecommendation = async (emp) => {
    const res = await API.post("/ai/recommend", {
      name: emp.name,
      skills: emp.skills,
      performanceScore: emp.performanceScore,
      experience: emp.experience
    });

    setAiResult(res.data);
  };

  // Ranking
  const sortedEmployees = [...employees].sort(
    (a, b) => b.performanceScore - a.performanceScore
  );

  const cardStyle = {
    background: "white",
    padding: "15px",
    borderRadius: "10px",
    color: "black",
    boxShadow: "0 5px 10px rgba(0,0,0,0.2)"
  };

  const btn = {
    marginTop: "5px",
    padding: "6px",
    borderRadius: "5px",
    border: "none",
    background: "#667eea",
    color: "white",
    cursor: "pointer",
    marginRight: "5px"
  };

  const deleteBtn = {
    ...btn,
    background: "red"
  };

  return (
    <div style={{ width: "90%", maxWidth: "1000px" }}>
      <h2 style={{ textAlign: "center", color: "white" }}>Employee List</h2>

      {/* Search */}
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <input
          placeholder="Search by Department"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: "8px",
            borderRadius: "6px",
            border: "none",
            marginRight: "10px"
          }}
        />
        <button onClick={handleSearch} style={btn}>Search</button>
        <button onClick={fetchEmployees} style={btn}>Reset</button>
      </div>

      {/* Grid Layout */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        gap: "15px"
      }}>
        {sortedEmployees.map((emp, index) => (
          <div key={emp._id} style={cardStyle}>
            {index === 0 && <p style={{ color: "green" }}>🏆 Top Performer</p>}

            <p><b>{emp.name}</b></p>
            <p>{emp.email}</p>
            <p>{emp.department}</p>
            <p>{emp.skills.join(", ")}</p>

            <p style={{
              color: emp.performanceScore > 80 ? "green" :
                     emp.performanceScore > 60 ? "orange" : "red"
            }}>
              Score: {emp.performanceScore}
            </p>

            <p>{emp.experience} yrs</p>

            <button onClick={() => getAIRecommendation(emp)} style={btn}>
              AI Suggestion
            </button>

            <button onClick={() => deleteEmployee(emp._id)} style={deleteBtn}>
              Delete
            </button>
          </div>
        ))}
      </div>

      {/* AI Result */}
      {aiResult && (
        <div style={{
          marginTop: "20px",
          background: "white",
          padding: "15px",
          borderRadius: "10px",
          color: "black"
        }}>
          <h3>AI Recommendation</h3>
          <p><b>Promotion:</b> {aiResult.promotion}</p>
          <p><b>Training:</b> {aiResult.training}</p>
          <p><b>Feedback:</b> {aiResult.feedback}</p>
        </div>
      )}
    </div>
  );
}

export default EmployeeList;