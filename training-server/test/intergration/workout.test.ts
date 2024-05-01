import request from 'supertest';
import app from '../../src/app';


describe('GET /api/v1/workouts/', () => {
    it('should return an array of workouts with the correct properties', async () => {
        const response = await request(app)
            .get('/api/v1/workouts/');
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(expect.arrayContaining([
            expect.objectContaining({
                user_workout_id: expect.any(Number),
                user_id: expect.any(Number),
                workout_type: expect.any(String),
                workout_status: expect.any(String),
                workout_date: expect.any(String),
                workout_name: expect.any(String),
                workout_description: expect.any(String),
                created_at: expect.any(String)
            })
        ]));
    });
});


describe('GET /api/v1/workouts/:workoutId', () => {
    it('should return a workout object with the correct properties when provided a valid ID', async () => {
        const userId = 1;
        const workoutId = 1;
        const response = await request(app)
            .get(`/api/v1/workouts/${userId}/${workoutId}`);
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(expect.objectContaining({
                user_workout_id: 1,
                user_id: 1,
                workout_type: "Gym",
                workout_status: "completed",
                workout_date: "2024-04-30T21:00:00.000Z",
                workout_name: "paska ",
                workout_description: "dfsdf",
                created_at: "2024-05-01T06:42:46.000Z"
        }));
    });
});


describe('POST /api/v1/workouts, no token provided', () => {
    it('should add a workout successfully', async () => {
      const newWorkout = {
        user_id: 1,
        workout_type: 'Gym',
        workout_date: '2024-04-30',
        workout_name: 'Leg Day',
        workout_description: 'Leg workouts including squats and deadlifts'
      };

      const response = await request(app)
        .post('/api/v1/workouts')
        .send(newWorkout) 
        .set('Content-Type', 'application/json')
        .expect(401);
    });
  });
  
