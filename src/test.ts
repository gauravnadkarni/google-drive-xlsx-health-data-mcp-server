import { ToolHandlers } from "./tools";
import { GoogleDriveService } from "./services";
import { ExcelParser } from "./services";

(async () => {
  const googleDrive = new GoogleDriveService();
  const excelParser = new ExcelParser();
  const toolHandlers = new ToolHandlers();
  const excelBuffer = await googleDrive.downloadExcelFile();
  const healthData = excelParser.parseHealthData(excelBuffer);
  /*console.log(
    await toolHandlers.handleGetDailyMetrics(healthData, { date: "2024-05-17" })
  );*/
  /*console.log(
    await toolHandlers.handleGetDateRangeMetrics(healthData, {
      startDate: "2024-01-17",
      endDate: "2024-01-27",
    })
  );*/
  /*console.log(
    await toolHandlers.handleGetActivityData(healthData, { days: 7 })
  );*/
  /*console.log(await toolHandlers.handleGetSleepData(healthData, { days: 7 }));*/
  /*console.log(await toolHandlers.handleGetHeartData(healthData, { days: 7 }));*/
  /*console.log(
    await toolHandlers.handleGetNutritionData(healthData, { days: 7 })
  );*/
  /*console.log(
    await toolHandlers.handleGetUserProfile(healthData, { user_id: "USR001" })
  );*/
  /*console.log(await toolHandlers.handleGetWeeklyData(healthData, { weeks: 1 }));*/
  /*console.log(
    await toolHandlers.handleGetMonthlyData(healthData, { months: 1 })
  );*/
  /*console.log(
    await toolHandlers.handleGetSeasonalData(healthData, { season: "fall" })
  );*/
  /*console.log(
    await toolHandlers.handleGetMetricHistory(healthData, {
      metricName: "steps",
      days: 7,
    })
  );*/
  console.log(
    await toolHandlers.handleGetMetricRange(healthData, {
      metricName: "distance_km",
      startDate: "2024-01-17",
      endDate: "2024-01-27",
    })
  );
})();
