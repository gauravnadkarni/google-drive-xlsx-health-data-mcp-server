import dotenv from "dotenv";

// Load environment variables
dotenv.config();

export const CONFIG = {
  GOOGLE_DRIVE_FILE_ID: getRequiredEnv("GOOGLE_DRIVE_FILE_ID"),
  GOOGLE_CREDENTIALS_PATH: getRequiredEnv("GOOGLE_CREDENTIALS_PATH"),

  // Google Drive API settings
  DRIVE_SCOPES: ["https://www.googleapis.com/auth/drive.readonly"],

  // MCP Server info
  SERVER_NAME: "performance-tracking-mcp",
  SERVER_VERSION: "1.0.0",
};

function getRequiredEnv(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
}
