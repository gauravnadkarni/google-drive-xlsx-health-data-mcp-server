import { z } from "zod";

const createDateSchema = (description: string) =>
  z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format (expected YYYY-MM-DD)")
    .refine((value) => {
      const date = new Date(value);
      return !isNaN(date.getTime());
    }, "Invalid date")
    .describe(description);

const activitySchema = z.object({
  date: createDateSchema("Date in YYYY-MM-DD format"),
  steps: z.number().int().nonnegative(),
  active_minutes: z.number().nonnegative(),
  calories_burned: z.number().nonnegative(),
  distance_km: z.number().nonnegative(),
  workout_type: z.string(),
  workout_duration: z.number().nonnegative(),
  intensity_score: z.number().nonnegative(),
});

const sleepSchema = z.object({
  date: createDateSchema("Date in YYYY-MM-DD format"),
  total_hours: z.number().nonnegative(),
  deep_sleep_hours: z.number().nonnegative(),
  rem_sleep_hours: z.number().nonnegative(),
  light_sleep_hours: z.number().nonnegative(),
  efficiency: z.number().nonnegative(),
  time_to_sleep: z.number().nonnegative(),
  awakenings: z.number().nonnegative(),
  sleep_quality: z.string(),
});

const heartSchema = z.object({
  date: createDateSchema("Date in YYYY-MM-DD format"),
  resting_hr: z.number().nonnegative(),
  hrv: z.number().nonnegative(),
  recovery_score: z.number().nonnegative(),
  stress_level: z.number().nonnegative(),
  body_battery: z.number().nonnegative(),
  readiness_score: z.number().nonnegative(),
  vo2_max: z.number().nonnegative(),
});

const nutritionSchema = z.object({
  date: createDateSchema("Date in YYYY-MM-DD format"),
  water_ml: z.number().nonnegative(),
  calories: z.number().nonnegative(),
  protein_g: z.number().nonnegative(),
  carbs_g: z.number().nonnegative(),
  fats_g: z.number().nonnegative(),
  fiber_g: z.number().nonnegative(),
  sugar_g: z.number().nonnegative(),
  alcohol_g: z.number().nonnegative(),
});

const userProfileSchema = z.object({
  user_id: z.string().describe("User ID"),
  age: z.number().int().nonnegative(),
  gender: z.string(),
  weight_kg: z.number().nonnegative(),
  height_cm: z.number().nonnegative(),
  fitness_goal: z.string(),
  target_steps: z.number().int().nonnegative(),
  target_sleep: z.number().nonnegative(),
  target_water_ml: z.number().nonnegative(),
});

const metricNameSchema = z
  .enum([
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
  ])
  .describe("Name of the metric to retrieve");

export const DailyMetricsTool = {
  name: "get_daily_metrics",
  title: "Get Daily Metrics",
  description: "Get complete health data for a specific day",
  inputSchema: {
    date: createDateSchema("Date in YYYY-MM-DD format"),
  },
  outputSchema: {
    date: z.string(),
    activity: activitySchema,
    sleep: sleepSchema,
    heart: heartSchema,
    nutrition: nutritionSchema,
  },
};

export const DateRangeMetricsTool = {
  name: "get_date_range_metrics",
  title: "Get Date Range Metrics",
  description: "Get health data for a specific date range",
  inputSchema: {
    startDate: createDateSchema("Start Date in YYYY-MM-DD format"),
    endDate: createDateSchema("End Date in YYYY-MM-DD format"),
  },
  outputSchema: {
    startDate: z.string(),
    endDate: z.string(),
    activity: z.array(activitySchema),
    sleep: z.array(sleepSchema),
    heart: z.array(heartSchema),
    nutrition: z.array(nutritionSchema),
  },
};

export const ActivityDataTool = {
  name: "get_activity_data",
  title: "Get Activity Data",
  description: "Get recent activity data for a specific number of days",
  inputSchema: {
    days: z.number().int().nonnegative(),
  },
  outputSchema: {
    days: z.number().int().nonnegative(),
    activity: z.array(activitySchema),
  },
};

export const SleepDataTool = {
  name: "get_sleep_data",
  title: "Get Sleep Data",
  description: "Get recent sleep data for a specific number of days",
  inputSchema: {
    days: z
      .number()
      .min(1)
      .max(730)
      .describe("Number of days to retrieve (1-730)"),
  },
  outputSchema: {
    days: z.number().int().nonnegative(),
    sleep: z.array(sleepSchema),
  },
};

export const HeartDataTool = {
  name: "get_heart_data",
  title: "Get Heart Data",
  description: "Get recent heart data for a specific number of days",
  inputSchema: {
    days: z
      .number()
      .min(1)
      .max(730)
      .describe("Number of days to retrieve (1-730)"),
  },
  outputSchema: {
    days: z.number().int().nonnegative(),
    heart: z.array(heartSchema),
  },
};

export const NutritionDataTool = {
  name: "get_nutrition_data",
  title: "Get Nutrition Data",
  description: "Get recent nutrition data for a specific number of days",
  inputSchema: {
    days: z
      .number()
      .min(1)
      .max(730)
      .describe("Number of days to retrieve (1-730)"),
  },
  outputSchema: {
    days: z.number().int().nonnegative(),
    nutrition: z.array(nutritionSchema),
  },
};

export const MetricHistoryTool = {
  name: "get_metric_history",
  title: "Get Metric History",
  description: "Get recent metric history for a specific number of days",
  inputSchema: {
    metricName: metricNameSchema,
    days: z
      .number()
      .min(1)
      .max(730)
      .default(30)
      .describe("Number of days to retrieve (1-730)"),
  },
  outputSchema: {
    days: z.number().int().nonnegative(),
    metricName: z.string(),
    metricHistory: z.array(
      z.object({
        date: z.string(),
        value: z.number().nonnegative(),
      })
    ),
  },
};

export const UserProfileTool = {
  name: "get_user_profile",
  title: "Get User Profile",
  description: "Get user profile",
  inputSchema: {
    userId: z.string(),
  },
  outputSchema: z.object({ ...userProfileSchema.shape }),
};

export const WeeklyDataTool = {
  name: "get_weekly_data",
  title: "Get Weekly Data",
  description: "Get recent weekly data for a specific number of weeks",
  inputSchema: {
    weeks: z
      .number()
      .min(1)
      .max(104)
      .describe("Number of weeks to retrieve (1-104)"),
  },
  outputSchema: {
    weeks: z.number().int().nonnegative(),
    activity: z.array(activitySchema),
    sleep: z.array(sleepSchema),
    heart: z.array(heartSchema),
    nutrition: z.array(nutritionSchema),
  },
};

export const MonthlyDataTool = {
  name: "get_monthly_data",
  title: "Get Monthly Data",
  description: "Get recent monthly data for a specific number of months",
  inputSchema: {
    months: z
      .number()
      .min(1)
      .max(24)
      .describe("Number of months to retrieve (1-24)"),
  },
  outputSchema: {
    months: z.number().int().nonnegative(),
    activity: z.array(activitySchema),
    sleep: z.array(sleepSchema),
    heart: z.array(heartSchema),
    nutrition: z.array(nutritionSchema),
  },
};

export const SeasonalDataTool = {
  name: "get_seasonal_data",
  title: "Get Seasonal Data",
  description: "Get recent seasonal data for a specific number of seasons",
  inputSchema: {
    season: z
      .enum(["winter", "spring", "summer", "fall"])
      .describe("Season to retrieve data for"),
  },
  outputSchema: {
    season: z.enum(["winter", "spring", "summer", "fall"]),
    activity: z.array(activitySchema),
    sleep: z.array(sleepSchema),
    heart: z.array(heartSchema),
    nutrition: z.array(nutritionSchema),
  },
};

export const MetricRangeTool = {
  name: "get_metric_range",
  title: "Get Metric Range",
  description: "Get metric values for a specific date range",
  inputSchema: {
    metricName: metricNameSchema,
    startDate: createDateSchema("Start Date in YYYY-MM-DD format"),
    endDate: createDateSchema("End Date in YYYY-MM-DD format"),
  },
  outputSchema: {
    metricName: z.string(),
    startDate: z.string(),
    endDate: z.string(),
    metricHistory: z.array(
      z.object({
        date: z.string(),
        value: z.number().nonnegative(),
      })
    ),
  },
};
