import { startStdioServer } from "./stdio-server";
import { startHttpServer } from "./streamable-http-server";
import { HealthDataMCPServer } from "./mcp";

(() => {
  const mcpTransport = process.env.MCP_TRANSPORT || "stdio";
  if (!mcpTransport || (mcpTransport !== "stdio" && mcpTransport !== "http")) {
    console.error("MCP transport not specified");
    process.exit(1);
  }
  const server = new HealthDataMCPServer();
  if (mcpTransport === "stdio") {
    startStdioServer(server.getMcpServer());
  } else if (mcpTransport === "http") {
    startHttpServer(server.getMcpServer());
  }
})();
