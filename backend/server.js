const express = require("express");
const cors = require("cors");
const { createClient } = require("@supabase/supabase-js");

const app = express();
app.use(cors());
app.use(express.json());

const supabase = createClient(
  "https://pnoxdmxuzwdfbhalshcf.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBub3hkbXh1endkZmJoYWxzaGNmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIyMDUwNzMsImV4cCI6MjA4Nzc4MTA3M30.SU-VgVCLdbaX6_KgrX-6jy3EDZZkw66bGd8F4Ru9uPQ"
);

// 🔹 Normal API
app.post("/add", async (req, res) => {
  const { text } = req.body;

  const { data, error } = await supabase
    .from("messages")
    .insert([{ text }]);

  if (error) return res.status(400).json(error);
  res.json(data);
});

app.get("/all", async (req, res) => {
  const { data, error } = await supabase
    .from("messages")
    .select("*");

  if (error) return res.status(400).json(error);
  res.json(data);
});

// 🔹 MCP-style tool endpoint
app.post("/mcp/save_message", async (req, res) => {
  const { text } = req.body;

  const { data, error } = await supabase
    .from("messages")
    .insert([{ text }]);

  if (error) return res.status(400).json(error);

  res.json({
    success: true,
    inserted: data
  });
});

app.listen(3000, "0.0.0.0", () => {
  console.log("Backend running on port 3000");
});
// Simple MCP tool simulation
app.post("/mcp/tools", (req, res) => {
  res.json({
    tools: [
      {
        name: "save_message",
        description: "Save a message to Supabase",
        input_schema: {
          type: "object",
          properties: {
            text: { type: "string" }
          },
          required: ["text"]
        }
      }
    ]
  });
});
