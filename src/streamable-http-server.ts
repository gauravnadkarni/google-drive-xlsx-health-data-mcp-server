import express, { Request, Response } from "express";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import cors from "cors";

const app = express();
app.use(
  cors({
    origin: "*", // Configure appropriately for production, for example:
    // origin: ['https://your-remote-domain.com', 'https://your-other-remote-domain.com'],
    exposedHeaders: ["Mcp-Session-Id"],
    allowedHeaders: ["Content-Type", "mcp-session-id"],
  })
);
app.use(express.json());

const registerMcpEndpoint = (mcpServer: McpServer) => {
  app.post("/mcp", async (req: Request, res: Response) => {
    const transport = new StreamableHTTPServerTransport({
      sessionIdGenerator: undefined,
      enableJsonResponse: true,
    });

    res.on("close", () => {
      transport.close();
    });

    await mcpServer.connect(transport);
    await transport.handleRequest(req, res, req.body);
  });
};

const registerAppListener = () => {
  const port = parseInt(process.env.PORT || "3000");
  app
    .listen(port, () => {
      process.env.MCP_TRANSPORT === "http" &&
        console.log(`MCP Server running on http://localhost:${port}/mcp`);
    })
    .on("error", (error: unknown) => {
      process.env.MCP_TRANSPORT === "http" &&
        console.error("Server error:", error);
      process.exit(1);
    })
    .on("close", () => {
      process.env.MCP_TRANSPORT === "http" && console.log("Server closed");
      process.exit(0);
    })
    .on("SIGINT", () => {
      process.env.MCP_TRANSPORT === "http" && console.log("Server closed");
      process.exit(0);
    })
    .on("SIGTERM", () => {
      process.env.MCP_TRANSPORT === "http" && console.log("Server closed");
      process.exit(0);
    });
};

export const startHttpServer = (mcpServer: McpServer) => {
  registerMcpEndpoint(mcpServer);
  registerAppListener();
};
