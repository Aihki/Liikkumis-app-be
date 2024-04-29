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
        food_diary_ingredients VARCHAR(255),
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
        exercise_completed TINYINT(1) DEFAULT 0,
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

    CREATE TABLE Challenges (
        challenge_id INT AUTO_INCREMENT PRIMARY KEY,
        challenge_name VARCHAR(255) NOT NULL,
        description TEXT,
        start_date DATE,
        end_date DATE,
        target_type ENUM('Distance', 'Weight', 'Time', 'Repetition') NOT NULL,
        target_value DECIMAL(10,2) NOT NULL,
        active BOOLEAN DEFAULT TRUE
    );

    CREATE TABLE UserChallenges (
        user_challenge_id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT,
        challenge_id INT,
        start_date DATE DEFAULT CURRENT_DATE,
        progress DECIMAL(10,2) DEFAULT 0,
        completed BOOLEAN DEFAULT FALSE,
        completion_date DATE,
        FOREIGN KEY (user_id) REFERENCES Users(user_id),
        FOREIGN KEY (challenge_id) REFERENCES Challenges(challenge_id)
    );

    CREATE TABLE Achievements (
        achievement_id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        criterion ENUM('CompleteChallenge', 'ReachTarget') NOT NULL,
        criterion_detail VARCHAR(255) NOT NULL
    );

    CREATE TABLE UserAchievements (
        user_achievement_id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT,
        achievement_id INT,
        achieved_on DATE DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES Users(user_id),
        FOREIGN KEY (achievement_id) REFERENCES Achievements(achievement_id)
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

    INSERT INTO Challenges 
    (challenge_name, description, start_date, end_date, target_type, target_value, active) 
    VALUES
    ('30-Day Running Challenge', 'Complete 50 kilometers of running within 30 days to improve stamina and overall health.', '2024-01-01', '2024-01-31', 'Distance', 50.00, TRUE),
    ('10-Day Running Challenge', 'Complete 20 kilometers of running within 10 days to boost your quick sprint capabilities.', '2024-01-01', '2024-01-11', 'Distance', 20.00, TRUE),
    ('Bronze Strength', 'Complete 100 repetitions of any strength exercises.', CURRENT_DATE, '9999-12-31', 'Repetition', 100.00, TRUE),
    ('Silver Strength', 'Complete 500 repetitions of any strength exercises.', CURRENT_DATE, '9999-12-31', 'Repetition', 500.00, TRUE),
    ('Gold Strength', 'Complete 1000 repetitions of any strength exercises.', CURRENT_DATE, '9999-12-31', 'Repetition', 1000.00, TRUE),
    ('Platinum Strength', 'Achieve a grand total of 10000 repetitions across all your workouts.', CURRENT_DATE, '9999-12-31', 'Repetition', 10000.00, TRUE);



    INSERT INTO Achievements (title, description, criterion, criterion_detail) VALUES
    ('Bronze Strength Achiever', 'Awarded for completing the Bronze Strength Challenge.', 'CompleteChallenge', 'Bronze Strength'),
    ('Silver Strength Achiever', 'Awarded for completing the Silver Strength Challenge.', 'CompleteChallenge', 'Silver Strength'),
    ('Gold Strength Achiever', 'Awarded for completing the Gold Strength Challenge.', 'CompleteChallenge', 'Gold Strength'),
    ('Platinum Strength Achiever', 'Awarded for completing the Platinum Strength Challenge.', 'CompleteChallenge', 'Platinum Strength');


    INSERT INTO Achievements (title, description, criterion, criterion_detail) VALUES
    ('10-Day Running Conqueror', 'Awarded for completing the 10-Day Running Challenge.', 'CompleteChallenge', '10-Day Running Challenge');

    INSERT INTO Achievements (title, description, criterion, criterion_detail) 
    VALUES ('30-Day Running Conqueror', 'Awarded for completing the 30-Day Running Challenge.', 'CompleteChallenge', '30-Day Running Challenge');

    INSERT INTO UserLevels (level_name) VALUES ('Admin'), ('User'), ('Guest');
    INSERT INTO Exercises (exercise_id, exercise_name , exercise_weight, exercise_reps) VALUES (1, 'Bench Press', 100, 10), (2, 'Squat', 150, 10), (3, 'Deadlift', 200, 10), (4, 'Pull-up', 0, 10), (5, 'Push-up', 0, 10), (6, 'Sit-up', 0, 10), (7, 'Plank', 0, 10);  


