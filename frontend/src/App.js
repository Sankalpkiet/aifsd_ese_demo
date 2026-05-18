import EmployeeForm from "./components/EmployeeForm";
import EmployeeList from "./components/EmployeeList";

function App() {
  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #667eea, #764ba2)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "20px",
      color: "white",
      fontFamily: "Arial"
    }}>
      <h1 style={{ marginBottom: "20px" }}>🚀 AI Employee System</h1>

      <EmployeeForm />
      <EmployeeList />
    </div>
  );
}

export default App;