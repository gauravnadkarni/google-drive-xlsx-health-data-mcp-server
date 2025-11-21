import { Tool } from "@modelcontextprotocol/sdk/types.js";

export const dataRetrievalTools: Tool[] = [
  {
    name: "get_daily_metrics",
    description:
      "Get all health metrics for a specific date (format: YYYY-MM-DD)",
    inputSchema: {
      type: "object",
      properties: {
        date: {
          type: "string",
          description: "Date in YYYY-MM-DD format",
        },
      },
      required: ["date"],
    },
  },
  {
    name: "get_date_range_metrics",
    description: "Get all health metrics for a date range",
    inputSchema: {
      type: "object",
      properties: {
        startDate: {
          type: "string",
          description: "Start date in YYYY-MM-DD format",
        },
        endDate: {
          type: "string",
          description: "End date in YYYY-MM-DD format",
        },
      },
      required: ["startDate", "endDate"],
    },
  },
  {
    name: "get_activity_data",
    description: "Get activity metrics for specified number of recent days",
    inputSchema: {
      type: "object",
      properties: {
        days: {
          type: "number",
          description: "Number of days to retrieve (1-730)",
          minimum: 1,
          maximum: 730,
        },
      },
      required: ["days"],
    },
  },
  {
    name: "get_sleep_data",
    description: "Get sleep metrics for specified number of recent days",
    inputSchema: {
      type: "object",
      properties: {
        days: {
          type: "number",
          description: "Number of days to retrieve (1-730)",
          minimum: 1,
          maximum: 730,
        },
      },
      required: ["days"],
    },
  },
  {
    name: "get_heart_data",
    description: "Get cardiovascular and recovery metrics for specified days",
    inputSchema: {
      type: "object",
      properties: {
        days: {
          type: "number",
          description: "Number of days to retrieve (1-730)",
          minimum: 1,
          maximum: 730,
        },
      },
      required: ["days"],
    },
  },
  {
    name: "get_nutrition_data",
    description: "Get nutritional intake metrics for specified days",
    inputSchema: {
      type: "object",
      properties: {
        days: {
          type: "number",
          description: "Number of days to retrieve (1-730)",
          minimum: 1,
          maximum: 730,
        },
      },
      required: ["days"],
    },
  },
  {
    name: "get_metric_history",
    description: "Get historical data for a specific health metric",
    inputSchema: {
      type: "object",
      properties: {
        metricName: {
          type: "string",
          enum: [
            "steps",
            "active_minutes",
            "calories_burned",
            "distance_km",
            "total_hours",
            "efficiency",
            "resting_hr",
            "hrv",
            "recovery_score",
            "water_ml",
            "calories",
            "protein_g",
          ],
          description: "Name of the metric to retrieve",
        },
        days: {
          type: "number",
          description: "Number of days to retrieve (1-730)",
          minimum: 1,
          maximum: 730,
        },
      },
      required: ["metricName"],
    },
  },
  {
    name: "get_user_profile",
    description: "Get user profile information and goals",
    inputSchema: {
      type: "object",
      properties: {},
    },
  },
];
