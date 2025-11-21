**Author**: Gaurav Nadkarni <nadkarnigaurav@gmail.com>  
**Repository**: https://github.com/gauravnadkarni/google-drive-xlsx-health-data-mcp-server.git

# Google Drive Health Data MCP Server

A Model Context Protocol (MCP) server for accessing and analyzing health metrics data stored in Google Drive spreadsheets.

## Features

- **Health Data Integration**: Connects to Google Drive to access health metrics data
- **Multiple Data Views**: Supports daily, weekly, monthly, and seasonal health metrics
- **Comprehensive Metrics**: Tracks various health indicators including:
  - Activity data
  - Heart rate
  - Sleep patterns
  - Nutrition information
  - User profile data

## Prerequisites

- Node.js (v16 or later)
- npm or yarn
- Google Cloud Platform project with Google Drive API enabled
- Service account credentials for Google Drive API
- Health data google sheet file (Sample file is in the ./uploads directory)

## Installation

Clone the repository:

```bash
git clone https://github.com/gauravnadkarni/google-drive-xlsx-health-data-mcp-server.git
cd google-drive-xlsx-health-data-mcp-server
```

Install dependencies:

```bash
npm install
```

MCP server can be run in two modes:

1. STDIO Mode:
   In this mode, the MCP server communicates with the client via standard input/output (stdio) streams. The server runs as a child process, and all communication happens through stdin/stdout pipes. This is ideal for local development and testing as it requires no network configuration and provides direct process-to-process communication.

2. HTTP Mode:
   In this mode, the MCP server runs as an HTTP server and communicates with clients via HTTP/WebSocket protocols. This enables remote access, multi-client connections, and production deployment scenarios. It's suitable for cloud deployment, cross-machine access, and when multiple applications need to connect to the same MCP server instance.

## Running the Server

To run the server in STDIO mode:

```bash
MCP_TRANSPORT=stdio npm run start
```

To run the server in HTTP mode:

```bash
MCP_TRANSPORT=http npm run start
```

Required environment configurations:

```bash
GOOGLE_DRIVE_FILE_ID=
GOOGLE_CREDENTIALS_PATH=
PORT="3002"
MCP_TRANSPORT="stdio" #http or stdio
DOTENV_CONFIG_QUIET="true" # Set to true to suppress dotenv warnings (optional for http mode but required for stdio mode)
```

## Important Notes

- You should create a project in google console and enable google drive api.
- Create service account and download credentials json file and place it in the root directory of the project.
- Upload the health data file to drive and share it with the email id of the service account.
- For STDIO mode, you should set the GOOGLE_DRIVE_FILE_ID and GOOGLE_CREDENTIALS_PATH environment variables in the client application (example claude code mcp json file or the MCP inspector)
- For HTTP mode, you should set the GOOGLE_DRIVE_FILE_ID and GOOGLE_CREDENTIALS_PATH environment variables in the server application (example .env file)
- STDIO mode is the default mode and in case no MCP_TRANSPORT environment variable is set, it will run in STDIO mode.
