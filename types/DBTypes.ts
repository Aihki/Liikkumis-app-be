type UserLevel = {
  levelId: number;
  level_name: string;
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
  userId: number;
  foodDiaryDate: Date;
  foodDiaryMeal: string;
  foodDiaryCalories: number;
  createdAt: Date;
};
  
  type UserWorkout = {
  userWorkoutId: number;
  userId: number;
  workoutDate: Date;
  workoutName: string;
  workoutDescription: string;
  createdAt: Date;
};
  
type Exercise = {
  exerciseId: number;
  userId: number;
  userWorkoutId: number;
  exerciseName: string;
  exerciseWeight: number;
  exerciseReps: number;
  createdAt: Date;
};
  
type UserProgress = {
  progressId: number;
  userId: number;
  progressImg: string | null;
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

type UserWithLevel = Omit<User, 'userLevelId'> &
Pick<UserLevel, 'level_name'>;

type UserWithNoPassword = Omit<UserWithLevel, 'password'>;

type TokenContent = Pick<User, 'user_id'> & Pick<UserLevel, 'level_name'>;

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
    FileInfo
  };