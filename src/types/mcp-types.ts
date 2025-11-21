import { z } from "zod";

// Tool input schemas for validation
export const DateRangeSchema = z.object({
  startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be YYYY-MM-DD"),
  endDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be YYYY-MM-DD"),
});

export const MetricHistorySchema = z.object({
  metricName: z.enum([
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
  ]),
  days: z.number().min(1).max(730).default(30),
});

export const SingleDateSchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be YYYY-MM-DD"),
});

export const PeriodSchema = z.object({
  days: z.number().min(1).max(730).default(30),
});

export type DateRangeParams = z.infer<typeof DateRangeSchema>;
export type MetricHistoryParams = z.infer<typeof MetricHistorySchema>;
export type SingleDateParams = z.infer<typeof SingleDateSchema>;
export type PeriodParams = z.infer<typeof PeriodSchema>;
