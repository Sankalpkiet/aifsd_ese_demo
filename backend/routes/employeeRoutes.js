const express = require("express");
const router = express.Router();

const {
  addEmployee,
  getAllEmployees,
  searchEmployee,
  deleteEmployee
} = require("../controllers/employeeController");

// No auth for now
router.get("/", getAllEmployees);
router.get("/search", searchEmployee);
router.post("/", addEmployee);
router.delete("/:id", deleteEmployee);

module.exports = router;