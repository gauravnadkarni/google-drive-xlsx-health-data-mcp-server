import * as XLSX from "xlsx";
import {
  HealthData,
  UserProfile,
  DailyActivity,
  SleepData,
  HeartRecovery,
  Nutrition,
} from "../types/health-data";

export class ExcelParser {
  parseHealthData(excelBuffer: Buffer): HealthData {
    try {
      const workbook = XLSX.read(excelBuffer, { type: "buffer" });

      return {
        userProfile: this.parseUserProfile(workbook),
        dailyActivity: this.parseDailyActivity(workbook),
        sleepData: this.parseSleepData(workbook),
        heartRecovery: this.parseHeartRecovery(workbook),
        nutrition: this.parseNutrition(workbook),
      };
    } catch (error) {
      throw new Error(
        `Failed to parse Excel file: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  }

  private parseUserProfile(workbook: XLSX.WorkBook): UserProfile {
    const sheet = workbook.Sheets["user_profile"];
    if (!sheet) {
      throw new Error("user_profile sheet not found in Excel file");
    }

    const data = XLSX.utils.sheet_to_json(sheet)[0] as any;

    return {
      user_id: data.user_id,
      age: data.age,
      gender: data.gender,
      weight_kg: data.weight_kg,
      height_cm: data.height_cm,
      fitness_goal: data.fitness_goal,
      target_steps: data.target_steps,
      target_sleep: data.target_sleep,
      target_water_ml: data.target_water_ml,
    };
  }

  private parseDailyActivity(workbook: XLSX.WorkBook): DailyActivity[] {
    const sheet = workbook.Sheets["daily_activity"];
    if (!sheet) {
      throw new Error("daily_activity sheet not found in Excel file");
    }

    const data = XLSX.utils.sheet_to_json(sheet) as any[];
    return data.map((row) => ({
      date: this.convertExcelDateToString(row.date),
      steps: row.steps,
      active_minutes: row.active_minutes,
      calories_burned: row.calories_burned,
      distance_km: row.distance_km,
      workout_type: row.workout_type,
      workout_duration: row.workout_duration,
      intensity_score: row.intensity_score,
    }));
  }

  private parseSleepData(workbook: XLSX.WorkBook): SleepData[] {
    const sheet = workbook.Sheets["sleep_data"];
    if (!sheet) {
      throw new Error("sleep_data sheet not found in Excel file");
    }

    const data = XLSX.utils.sheet_to_json(sheet) as any[];

    return data.map((row) => ({
      date: this.convertExcelDateToString(row.date),
      total_hours: row.total_hours,
      deep_sleep_hours: row.deep_sleep_hours,
      rem_sleep_hours: row.rem_sleep_hours,
      light_sleep_hours: row.light_sleep_hours,
      efficiency: row.efficiency,
      time_to_sleep: row.time_to_sleep,
      awakenings: row.awakenings,
      sleep_quality: row.sleep_quality,
    }));
  }

  private parseHeartRecovery(workbook: XLSX.WorkBook): HeartRecovery[] {
    const sheet = workbook.Sheets["heart_recovery"];
    if (!sheet) {
      throw new Error("heart_recovery sheet not found in Excel file");
    }

    const data = XLSX.utils.sheet_to_json(sheet) as any[];

    return data.map((row) => ({
      date: this.convertExcelDateToString(row.date),
      resting_hr: row.resting_hr,
      hrv: row.hrv,
      recovery_score: row.recovery_score,
      stress_level: row.stress_level,
      body_battery: row.body_battery,
      readiness_score: row.readiness_score,
      vo2_max: row.vo2_max,
    }));
  }

  private parseNutrition(workbook: XLSX.WorkBook): Nutrition[] {
    const sheet = workbook.Sheets["nutrition"];
    if (!sheet) {
      throw new Error("nutrition sheet not found in Excel file");
    }

    const data = XLSX.utils.sheet_to_json(sheet) as any[];

    return data.map((row) => ({
      date: this.convertExcelDateToString(row.date),
      water_ml: row.water_ml,
      calories: row.calories,
      protein_g: row.protein_g,
      carbs_g: row.carbs_g,
      fats_g: row.fats_g,
      fiber_g: row.fiber_g,
      sugar_g: row.sugar_g,
      alcohol_g: row.alcohol_g,
    }));
  }

  private convertExcelDateToString(excelDate: any): string {
    // If it's already a string, return it
    if (typeof excelDate === "string") {
      return excelDate;
    }

    // If it's a number (Excel serial date), convert it
    if (typeof excelDate === "number") {
      // Excel date serial number: days since January 1, 1900
      const date = new Date((excelDate - 25569) * 86400 * 1000); // Convert to milliseconds
      return date.toISOString().split("T")[0]; // Return YYYY-MM-DD
    }

    // If it's a Date object, format it
    if (excelDate instanceof Date) {
      return excelDate.toISOString().split("T")[0];
    }

    throw new Error(`Invalid date format: ${excelDate}`);
  }
}
