-- Drop the database if it exists and then create it
  DROP DATABASE IF EXISTS LiikkumisApp;
  CREATE DATABASE LiikkumisApp;
  USE LiikkumisApp;

  -- Create the tables

  CREATE TABLE UserLevels (
      level_id INT AUTO_INCREMENT PRIMARY KEY,
      level_name VARCHAR(50) NOT NULL
  );

  CREATE TABLE Users (
      user_id INT AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(50) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      email VARCHAR(100) NOT NULL UNIQUE,
      user_level_id INT,
      user_profile_pic VARCHAR(255),
      user_banner_pic VARCHAR(255),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_level_id) REFERENCES UserLevels(level_id)
  );

    CREATE TABLE FoodDiary (
        food_diary_id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT,
        food_diary_date DATE,
        food_diary_notes VARCHAR(255),
        food_diary_ingrediants VARCHAR(255),
        food_diary_meal VARCHAR(255),
        food_diary_calories INT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES Users(user_id)
    );

    CREATE TABLE UserWorkouts (
        user_workout_id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT,
        workout_type ENUM('Gym', 'Body Weight', 'Cardio') NOT NULL,
        workout_status ENUM('completed', 'pending') NOT NULL DEFAULT 'pending',
        workout_date DATE,
        workout_name VARCHAR(50),
        workout_description VARCHAR(200),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES Users(user_id)
    );

    CREATE TABLE Exercises (
        exercise_id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT,
        user_workout_id INT,
        exercise_name VARCHAR(50),
        exercise_weight INT,
        exercise_reps INT,
        exercise_sets INT,
        exercise_duration INT,
        exercise_distance INT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_workout_id) REFERENCES UserWorkouts(user_workout_id)
    );

    CREATE TABLE PersonalBests (
    pb_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    exercise_name VARCHAR(50),
    max_weight INT,
    record_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
    );

    CREATE TABLE UserProgress (
        progress_id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT,
        progress_image VARCHAR(255),
        progress_date DATE,
        progress_weight INT,
        progress_height INT,
        progress_circumference_chest INT,
        progress_circumference_waist INT,
        progress_circumference_thigh_r INT,
        progress_circumference_thigh_l INT,
        progress_circumference_bicep_r INT,
        progress_circumference_bicep_l INT,
        progress_circumference_calves_r INT,
        progress_circumference_calves_l INT,
        FOREIGN KEY (user_id) REFERENCES Users(user_id)
    );

  INSERT INTO UserLevels (level_name) VALUES ('Admin'), ('User'), ('Guest');
  INSERT INTO Exercises (exercise_id, exercise_name , exercise_weight, exercise_reps) VALUES (1, 'Bench Press', 100, 10), (2, 'Squat', 150, 10), (3, 'Deadlift', 200, 10), (4, 'Pull-up', 0, 10), (5, 'Push-up', 0, 10), (6, 'Sit-up', 0, 10), (7, 'Plank', 0, 10);  


