const axios = require("axios");

// JSON-RPC over STDIO
process.stdin.on("data", async (chunk) => {
  try {
    const request = JSON.parse(chunk.toString());

    if (request.method === "tools/list") {
      process.stdout.write(JSON.stringify({
        jsonrpc: "2.0",
        id: request.id,
        result: {
          tools: [
            {
              name: "save_message",
              description: "Save a message into Supabase",
              input_schema: {
                type: "object",
                properties: {
                  text: { type: "string" }
                },
                required: ["text"]
              }
            }
          ]
        }
      }));
    }

    if (request.method === "tools/call") {
      const { name, arguments: args } = request.params;

      if (name === "save_message") {
        const response = await axios.post(
          "http://localhost:3000/mcp/save_message",
          { text: args.text }
        );

        process.stdout.write(JSON.stringify({
          jsonrpc: "2.0",
          id: request.id,
          result: response.data
        }));
      }
    }

  } catch (err) {
    process.stdout.write(JSON.stringify({
      jsonrpc: "2.0",
      id: null,
      error: { message: err.message }
    }));
  }
});
