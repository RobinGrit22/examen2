const express = require("express");
const axios = require("axios");

const router = express.Router();

router.post("/project/:project_id/issue", async (req, res) => {
  const { project_id } = req.params;
  const { title, description, priority } = req.body;

  const todo_state_id = "7950701c-2fe5-4274-ab2a-0ea4b86b2c74";
  const examen_team_id = "4446bd50-c259-4c1d-a5f1-0bb35479d7ca";

  const query = `
    mutation IssueCreate($input: IssueCreateInput!) {
      issueCreate(input: $input) {
        issue {
          id
        }
      }
    }
  `;

  try {
    const response = await axios.post(
      "https://api.linear.app/graphql",
      {
        query,
        variables: {
          input: {
            projectId: project_id,
            priority,
            title,
            description,
            stateId: todo_state_id,
            teamId: examen_team_id,
          },
        },
      },
      {
        headers: {
          Authorization: process.env.LINEAR_API_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    console.log(`Linear response code ${response.status} - ${response.data}`);
    res.status(200).json(response.data);
  } catch (error) {
    console.error(
      "Error creating issue:",
      error.response ? error.response.data : error.message,
      error.response ? error.response.status : "No status",
      error.response ? error.response.headers : "No headers"
    );
    res.status(500).json({
      error: "Failed to create issue",
      details: error.response ? error.response.data : error.message,
    });
  }
});

module.exports = router;
