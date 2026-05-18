const axios = require("axios");

exports.getRecommendation = async (req, res) => {
  try {
    const { name, skills, performanceScore, experience } = req.body;

    const prompt = `
    Employee Name: ${name}
    Skills: ${skills}
    Performance Score: ${performanceScore}
    Experience: ${experience} years

    Give:
    1. Promotion suggestion
    2. Training recommendation
    3. Feedback
    `;

    // Dummy AI response (for now)
    const aiResponse = {
      promotion: performanceScore > 80 ? "Eligible for promotion" : "Needs improvement",
      training: "Improve advanced skills in domain",
      feedback: "Keep improving consistency and teamwork"
    };

    res.status(200).json(aiResponse);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};