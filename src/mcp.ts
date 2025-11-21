import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { formatToolResponse, GoogleDriveService } from "./services";
import { ExcelParser } from "./services";
import { CONFIG } from "./config";
import { ToolHandlers } from "./tools";
import {
  ActivityDataTool,
  DailyMetricsTool,
  DateRangeMetricsTool,
  HeartDataTool,
  MetricHistoryTool,
  MetricRangeTool,
  MonthlyDataTool,
  NutritionDataTool,
  SeasonalDataTool,
  SleepDataTool,
  UserProfileTool,
  WeeklyDataTool,
} from "./tools/health-metrics";

// Create an MCP server
const server = new McpServer({
  name: CONFIG.SERVER_NAME,
  version: CONFIG.SERVER_VERSION,
});

export class HealthDataMCPServer {
  private googleDrive: GoogleDriveService;
  private excelParser: ExcelParser;
  private toolHandlers: ToolHandlers;
  private healthData: any = null;

  constructor() {
    this.googleDrive = new GoogleDriveService();
    this.excelParser = new ExcelParser();
    this.toolHandlers = new ToolHandlers();

    this.registerAllTools();
  }

  getMcpServer(): McpServer {
    return server;
  }

  private registerAllTools(): void {
    server.registerTool(
      "get_daily_metrics",
      DailyMetricsTool,
      async ({ date }) => {
        const healthData = await this.ensureHealthDataLoaded();
        const structuredContent = await this.toolHandlers.handleGetDailyMetrics(
          healthData,
          {
            date,
          }
        );
        return formatToolResponse({ date, ...structuredContent });
      }
    );

    server.registerTool(
      "get_date_range_metrics",
      DateRangeMetricsTool,
      async ({ startDate, endDate }) => {
        const healthData = await this.ensureHealthDataLoaded();
        const structuredContent =
          await this.toolHandlers.handleGetDateRangeMetrics(healthData, {
            startDate,
            endDate,
          });
        return formatToolResponse({ startDate, endDate, ...structuredContent });
      }
    );

    server.registerTool(
      "get_activity_data",
      ActivityDataTool,
      async ({ days }) => {
        const healthData = await this.ensureHealthDataLoaded();
        const structuredContent = await this.toolHandlers.handleGetActivityData(
          healthData,
          { days }
        );
        return formatToolResponse({ days, activity: structuredContent });
      }
    );

    server.registerTool("get_sleep_data", SleepDataTool, async ({ days }) => {
      const healthData = await this.ensureHealthDataLoaded();
      const structuredContent = await this.toolHandlers.handleGetSleepData(
        healthData,
        { days }
      );
      return formatToolResponse({ days, sleep: structuredContent });
    });

    server.registerTool("get_heart_data", HeartDataTool, async ({ days }) => {
      const healthData = await this.ensureHealthDataLoaded();
      const structuredContent = await this.toolHandlers.handleGetHeartData(
        healthData,
        { days }
      );
      return formatToolResponse({ days, heart: structuredContent });
    });

    server.registerTool(
      "get_nutrition_data",
      NutritionDataTool,
      async ({ days }) => {
        const healthData = await this.ensureHealthDataLoaded();
        const structuredContent =
          await this.toolHandlers.handleGetNutritionData(healthData, { days });
        return formatToolResponse({ days, nutrition: structuredContent });
      }
    );

    server.registerTool(
      "get_metric_history",
      MetricHistoryTool,
      async ({ metricName, days }) => {
        const healthData = await this.ensureHealthDataLoaded();
        const structuredContent =
          await this.toolHandlers.handleGetMetricHistory(healthData, {
            metricName,
            days,
          });
        return formatToolResponse({
          days,
          metricName,
          metricHistory: structuredContent,
        });
      }
    );

    server.registerTool(
      "get_user_profile",
      UserProfileTool,
      async ({ userId }) => {
        const healthData = await this.ensureHealthDataLoaded();
        const structuredContent = await this.toolHandlers.handleGetUserProfile(
          healthData,
          { userId }
        );
        return formatToolResponse(structuredContent);
      }
    );

    // Register additional tools for weekly, monthly, seasonal data, and metric ranges
    server.registerTool(
      "get_weekly_data",
      WeeklyDataTool,
      async ({ weeks }) => {
        const healthData = await this.ensureHealthDataLoaded();
        const structuredContent = await this.toolHandlers.handleGetWeeklyData(
          healthData,
          { weeks }
        );
        return formatToolResponse({ weeks, ...structuredContent });
      }
    );

    server.registerTool(
      "get_monthly_data",
      MonthlyDataTool,
      async ({ months }) => {
        const healthData = await this.ensureHealthDataLoaded();
        const structuredContent = await this.toolHandlers.handleGetMonthlyData(
          healthData,
          { months }
        );
        return formatToolResponse({ months, ...structuredContent });
      }
    );

    server.registerTool(
      "get_seasonal_data",
      SeasonalDataTool,
      async ({ season }) => {
        const healthData = await this.ensureHealthDataLoaded();
        const structuredContent = await this.toolHandlers.handleGetSeasonalData(
          healthData,
          { season }
        );
        return formatToolResponse({ season, ...structuredContent });
      }
    );

    server.registerTool(
      "get_metric_range",
      MetricRangeTool,
      async ({ metricName, startDate, endDate }) => {
        const healthData = await this.ensureHealthDataLoaded();
        const structuredContent = await this.toolHandlers.handleGetMetricRange(
          healthData,
          {
            metricName,
            startDate,
            endDate,
          }
        );
        return formatToolResponse({
          metricName,
          startDate,
          endDate,
          metricHistory: structuredContent,
        });
      }
    );
  }

  private async ensureHealthDataLoaded(): Promise<any> {
    if (!this.healthData) {
      console.debug("Loading health data from Google Drive...");
      const excelBuffer = await this.googleDrive.downloadExcelFile();
      this.healthData = this.excelParser.parseHealthData(excelBuffer);
    }
    return this.healthData;
  }
}
