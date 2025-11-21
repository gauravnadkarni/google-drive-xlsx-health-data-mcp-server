export interface DailyActivity {
  date: string;
  steps: number;
  active_minutes: number;
  calories_burned: number;
  distance_km: number;
  workout_type: string;
  workout_duration: number;
  intensity_score: number;
}

export interface SleepData {
  date: string;
  total_hours: number;
  deep_sleep_hours: number;
  rem_sleep_hours: number;
  light_sleep_hours: number;
  efficiency: number;
  time_to_sleep: number;
  awakenings: number;
  sleep_quality: string;
}

export interface HeartRecovery {
  date: string;
  resting_hr: number;
  hrv: number;
  recovery_score: number;
  stress_level: number;
  body_battery: number;
  readiness_score: number;
  vo2_max: number;
}

export interface Nutrition {
  date: string;
  water_ml: number;
  calories: number;
  protein_g: number;
  carbs_g: number;
  fats_g: number;
  fiber_g: number;
  sugar_g: number;
  alcohol_g: number;
}

export interface UserProfile {
  user_id: string;
  age: number;
  gender: string;
  weight_kg: number;
  height_cm: number;
  fitness_goal: string;
  target_steps: number;
  target_sleep: number;
  target_water_ml: number;
}

export interface HealthData {
  userProfile: UserProfile;
  dailyActivity: DailyActivity[];
  sleepData: SleepData[];
  heartRecovery: HeartRecovery[];
  nutrition: Nutrition[];
}

export interface DateRange {
  startDate: string;
  endDate: string;
}
