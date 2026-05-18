const Employee = require("../models/Employee");

// Add Employee
exports.addEmployee = async (req, res) => {
  try {
    const { name, email, department, skills, performanceScore, experience } = req.body;

    const existingEmployee = await Employee.findOne({ email });
    if (existingEmployee) {
      return res.status(400).json({ message: "Employee already exists" });
    }

    const newEmployee = new Employee({
      name,
      email,
      department,
      skills,
      performanceScore,
      experience
    });

    await newEmployee.save();

    res.status(201).json({ message: "Employee added successfully", data: newEmployee });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All Employees
exports.getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Search Employee
exports.searchEmployee = async (req, res) => {
  try {
    const { department } = req.query;

    const employees = await Employee.find({
      department: { $regex: department, $options: "i" }
    });

    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ DELETE Employee
exports.deleteEmployee = async (req, res) => {
  try {
    await Employee.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};