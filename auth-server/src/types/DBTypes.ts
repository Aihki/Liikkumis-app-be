type UserLevel = {
  levelId: number;
  levelName: string;
};

type User = {
  user_id: number;
  username: string;
  password: string;
  email: string;
  userLevelId: number | null;
  userProfilePic: string | null;
  userBannerPic: string | null;
  createdAt: Date;
};

type FoodDiary = {
  foodDiaryId: number;
  user_id: number;
  foodDiaryDate: Date;
  foodDiaryMeal: string;
  foodDiaryCalories: number;
  createdAt: Date;
};

type UserWorkout = {
  userWorkoutId: number;
  user_id: number;
  workoutDate: Date;
  workoutName: string;
  workoutDescription: string;
  createdAt: Date;
};

type Exercise = {
  exerciseId: number;
  user_id: number;
  userWorkoutId: number;
  exerciseName: string;
  exerciseWeight: number;
  exerciseReps: number;
  createdAt: Date;
};

type UserProgress = {
  progressId: number;
  user_id: number;
  progressDate: Date;
  progressWeight: number;
  progressHeight: number;
  progressCircumferenceChest: number;
  progressCircumferenceWaist: number;
  progressCircumferenceThighR: number;
  progressCircumferenceThighL: number;
  progressCircumferenceBicepR: number;
  progressCircumferenceBicepL: number;
  progressCircumferenceCalvesR: number;
  progressCircumferenceCalvesL: number;
};

type UserWithLevel = Omit<User, "userLevelId"> & Pick<UserLevel, "levelName">;

type UserWithNoPassword = Omit<UserWithLevel, "password">;

type TokenContent = Pick<User, "user_id"> & Pick<UserLevel, "levelName">;

// for upload server
type FileInfo = {
  filename: string;
  user_id: number;
};

export type {
  UserLevel,
  User,
  FoodDiary,
  UserWorkout,
  Exercise,
  UserProgress,
  UserWithLevel,
  UserWithNoPassword,
  TokenContent,
  FileInfo,
};
