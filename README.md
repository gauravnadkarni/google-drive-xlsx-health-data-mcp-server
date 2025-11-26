**Author**: Gaurav Nadkarni <nadkarnigaurav@gmail.com>  
**Repository**: https://github.com/gauravnadkarni/google-drive-xlsx-health-data-mcp-server.git

# Google Drive Health Data MCP Server

A Model Context Protocol (MCP) server for accessing and analyzing health metrics data stored in Google Drive spreadsheets.

## 📖 Related Article

📚 **Read the accompanying Medium article**: [What I Learned Building My First MCP Server From Scratch](https://medium.com/@nadkarnigaurav/what-i-learned-building-my-first-mcp-server-from-scratch-6e53e268453a)

_Learn about the architecture, implementation details, and real-world use cases of this MCP server in the comprehensive technical write-up._

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
   Local process communication, ideal for single-user desktop applications.

2. HTTP Mode:
   Remote server access, supports multiple clients and cloud deployment.

## Building the Project

```bash
npm run build
```

## Running the Server

To run the server in STDIO mode:

```bash
MCP_TRANSPORT=stdio npm run start
```

To run the server in HTTP mode:

```bash
MCP_TRANSPORT=http npm run start
```

## Running the Project in dev mode

```bash
npm run dev
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

## Google Cloud Setup

- Create a project in Google Cloud Console
- Enable the Google Drive API
- Create a Service Account and download the credentials JSON file
- Place the credentials file in your project root as credentials.json

## Spreadsheet Setup

- Upload the sample health data file (from ./uploads directory) to your Google Drive
- Share the file with your service account email (viewer permissions)
- Copy the File ID from the Google Drive URL

Claude Desktop (STDIO Mode)
Add to your claude_desktop_config.json:

```json
{
  "mcpServers": {
    "health-data": {
      "command": "node",
      "args": ["/absolute/path/to/dist/server.js"],
      "env": {
        "GOOGLE_DRIVE_FILE_ID": "your_file_id",
        "GOOGLE_CREDENTIALS_PATH": "/path/to/credentials.json",
        "DOTENV_CONFIG_QUIET": "true"
      }
    }
  }
}
```

## To run MCP Inspector

```
npx @modelcontextprotocol/inspector
```

## 🛠️ Available Tools

The server provides 12 data retrieval tools:

get_daily_metrics - Health data for specific dates

get_date_range_metrics - Data across date ranges

get_activity_data - Steps, workouts, calories burned

get_sleep_data - Sleep quality and patterns

get_heart_data - Heart rate and recovery metrics

get_nutrition_data - Nutritional intake tracking

get_metric_history - Historical trends for specific metrics

get_user_profile - User information and goals

get_weekly_data - Weekly aggregated health data

get_monthly_data - Monthly health overviews

get_seasonal_data - Seasonal pattern analysis

get_metric_range - Custom metric analysis across dates

## Data Flow

Authentication: Service account credentials validate Google Drive access

Data Retrieval: Excel spreadsheet downloaded and parsed from Drive

Query Processing: Tools filter and structure health data based on LLM requests

Response Formatting: Structured JSON responses for LLM analysis
