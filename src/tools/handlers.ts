import { HealthData } from "../types";

export class ToolHandlers {
  async handleToolCall(
    toolName: string,
    healthData: HealthData,
    args: any
  ): Promise<any> {
    switch (toolName) {
      case "get_daily_metrics":
        return await this.handleGetDailyMetrics(healthData, args);

      case "get_date_range_metrics":
        return await this.handleGetDateRangeMetrics(healthData, args);

      case "get_activity_data":
        return await this.handleGetActivityData(healthData, args);

      case "get_sleep_data":
        return await this.handleGetSleepData(healthData, args);

      case "get_heart_data":
        return await this.handleGetHeartData(healthData, args);

      case "get_nutrition_data":
        return await this.handleGetNutritionData(healthData, args);

      case "get_metric_history":
        return await this.handleGetMetricHistory(healthData, args);

      case "get_user_profile":
        return await this.handleGetUserProfile(healthData, args);

      case "get_weekly_data":
        return await this.handleGetWeeklyData(healthData, args);

      case "get_monthly_data":
        return await this.handleGetMonthlyData(healthData, args);

      case "get_seasonal_data":
        return await this.handleGetSeasonalData(healthData, args);

      case "get_metric_range":
        return await this.handleGetMetricRange(healthData, args);

      default:
        throw new Error(`Unknown tool: ${toolName}`);
    }
  }

  // Basic Data Retrieval Handlers
  async handleGetDailyMetrics(healthData: HealthData, args: any): Promise<any> {
    const { date } = args;

    const activity = healthData.dailyActivity.find((d) => d.date === date);
    const sleep = healthData.sleepData.find((d) => d.date === date);
    const heart = healthData.heartRecovery.find((d) => d.date === date);
    const nutrition = healthData.nutrition.find((d) => d.date === date);

    if (!activity && !sleep && !heart && !nutrition) {
      throw new Error(`No data found for date: ${date}`);
    }

    return {
      activity,
      sleep,
      heart,
      nutrition,
    };
  }

  async handleGetDateRangeMetrics(
    healthData: HealthData,
    args: any
  ): Promise<any> {
    const { startDate, endDate } = args;

    const filteredData = {
      activity: healthData.dailyActivity.filter(
        (d) => d.date >= startDate && d.date <= endDate
      ),
      sleep: healthData.sleepData.filter(
        (d) => d.date >= startDate && d.date <= endDate
      ),
      heart: healthData.heartRecovery.filter(
        (d) => d.date >= startDate && d.date <= endDate
      ),
      nutrition: healthData.nutrition.filter(
        (d) => d.date >= startDate && d.date <= endDate
      ),
    };

    if (
      filteredData.activity.length === 0 ||
      filteredData.sleep.length === 0 ||
      filteredData.heart.length === 0 ||
      filteredData.nutrition.length === 0
    ) {
      throw new Error(
        `No data found for date range: ${startDate} to ${endDate}`
      );
    }

    return filteredData;
  }

  async handleGetActivityData(healthData: HealthData, args: any): Promise<any> {
    const { days } = args;
    const recentData = healthData.dailyActivity.slice(-days);

    if (recentData.length === 0) {
      throw new Error("No activity data available");
    }

    return recentData;
  }

  async handleGetSleepData(healthData: HealthData, args: any): Promise<any> {
    const { days } = args;
    const recentData = healthData.sleepData.slice(-days);

    if (recentData.length === 0) {
      throw new Error("No sleep data available");
    }

    return recentData;
  }

  async handleGetHeartData(healthData: HealthData, args: any): Promise<any> {
    const { days } = args;
    const recentData = healthData.heartRecovery.slice(-days);

    if (recentData.length === 0) {
      throw new Error("No heart data available");
    }

    return recentData;
  }

  async handleGetNutritionData(
    healthData: HealthData,
    args: any
  ): Promise<any> {
    const { days } = args;
    const recentData = healthData.nutrition.slice(-days);

    if (recentData.length === 0) {
      throw new Error("No nutrition data available");
    }

    return recentData;
  }

  async handleGetMetricHistory(
    healthData: HealthData,
    args: any
  ): Promise<any> {
    const { metricName, days = 30 } = args;
    const recentData = this.extractMetricData(healthData, metricName, days);

    if (recentData.length === 0) {
      throw new Error(`No data found for metric: ${metricName}`);
    }

    return recentData;
  }

  async handleGetUserProfile(
    healthData: HealthData,
    data: { userId: string }
  ): Promise<any> {
    return (
      healthData.userProfile.user_id === data.userId && healthData.userProfile
    );
  }

  // Advanced Data Retrieval Handlers
  async handleGetWeeklyData(healthData: HealthData, args: any): Promise<any> {
    const { weeks } = args;
    const days = weeks * 7;
    const recentData = {
      activity: healthData.dailyActivity.slice(-days),
      sleep: healthData.sleepData.slice(-days),
      heart: healthData.heartRecovery.slice(-days),
      nutrition: healthData.nutrition.slice(-days),
    };

    if (
      recentData.activity.length === 0 ||
      recentData.sleep.length === 0 ||
      recentData.heart.length === 0 ||
      recentData.nutrition.length === 0
    ) {
      throw new Error("No data available for the specified period");
    }

    return recentData;
  }

  async handleGetMonthlyData(healthData: HealthData, args: any): Promise<any> {
    const { months } = args;
    const days = months * 30;
    const recentData = {
      activity: healthData.dailyActivity.slice(-days),
      sleep: healthData.sleepData.slice(-days),
      heart: healthData.heartRecovery.slice(-days),
      nutrition: healthData.nutrition.slice(-days),
    };

    if (
      recentData.activity.length === 0 ||
      recentData.sleep.length === 0 ||
      recentData.heart.length === 0 ||
      recentData.nutrition.length === 0
    ) {
      throw new Error("No data available for the specified period");
    }

    return recentData;
  }

  async handleGetSeasonalData(healthData: HealthData, args: any): Promise<any> {
    const { season } = args;
    const seasonMonths = this.getSeasonMonths(season);

    const filteredData = {
      activity: healthData.dailyActivity.filter((d) => {
        const month = parseInt(d.date.split("-")[1]);
        return seasonMonths.includes(month);
      }),
      sleep: healthData.sleepData.filter((d) => {
        const month = parseInt(d.date.split("-")[1]);
        return seasonMonths.includes(month);
      }),
      heart: healthData.heartRecovery.filter((d) => {
        const month = parseInt(d.date.split("-")[1]);
        return seasonMonths.includes(month);
      }),
      nutrition: healthData.nutrition.filter((d) => {
        const month = parseInt(d.date.split("-")[1]);
        return seasonMonths.includes(month);
      }),
    };

    if (
      filteredData.activity.length === 0 ||
      filteredData.sleep.length === 0 ||
      filteredData.heart.length === 0 ||
      filteredData.nutrition.length === 0
    ) {
      throw new Error(`No data found for season: ${season}`);
    }

    return filteredData;
  }

  handleGetMetricRange(healthData: HealthData, args: any): any {
    const { metricName, startDate, endDate } = args;

    const metricData = this.extractMetricDataInRange(
      healthData,
      metricName,
      startDate,
      endDate
    );

    if (metricData.length === 0) {
      throw new Error(
        `No data found for metric ${metricName} in range ${startDate} to ${endDate}`
      );
    }

    return metricData;
  }

  // Helper Methods
  private extractMetricData(
    healthData: HealthData,
    metricName: string,
    days: number
  ): any[] {
    const recentDates = this.getRecentDates(days);

    return recentDates
      .map((date) => {
        let value: any = null;

        const activity = healthData.dailyActivity.find((d) => d.date === date);
        if (activity && metricName in activity) {
          value = (activity as any)[metricName];
        }

        const sleep = healthData.sleepData.find((d) => d.date === date);
        if (sleep && metricName in sleep) {
          value = (sleep as any)[metricName];
        }

        const heart = healthData.heartRecovery.find((d) => d.date === date);
        if (heart && metricName in heart) {
          value = (heart as any)[metricName];
        }

        const nutrition = healthData.nutrition.find((d) => d.date === date);
        if (nutrition && metricName in nutrition) {
          value = (nutrition as any)[metricName];
        }

        return { date, value };
      })
      .filter((item) => item.value !== null);
  }

  private extractMetricDataInRange(
    healthData: HealthData,
    metricName: string,
    startDate: string,
    endDate: string
  ): any[] {
    const allData = [
      ...healthData.dailyActivity,
      ...healthData.sleepData,
      ...healthData.heartRecovery,
      ...healthData.nutrition,
    ];

    return allData
      .filter((item) => item.date >= startDate && item.date <= endDate)
      .map((item) => {
        if (metricName in item) {
          return {
            date: item.date,
            value: (item as any)[metricName],
          };
        }
        return null;
      })
      .filter((item) => item !== null);
  }

  private getRecentDates(days: number): string[] {
    return Array.from({ length: days }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (days - i - 1));
      return date.toISOString().split("T")[0];
    });
  }

  private getSeasonMonths(season: string): number[] {
    switch (season) {
      case "winter":
        return [12, 1, 2];
      case "spring":
        return [3, 4, 5];
      case "summer":
        return [6, 7, 8];
      case "fall":
        return [9, 10, 11];
      default:
        return [];
    }
  }
}
