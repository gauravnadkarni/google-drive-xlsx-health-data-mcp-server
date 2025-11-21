import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

export async function startStdioServer(server: McpServer): Promise<void> {
  // Keep STDIO for local development/testing
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.debug("Health Data MCP server running on stdio (local mode)");
}
