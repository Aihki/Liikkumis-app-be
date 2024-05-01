import request from 'supertest';
import app from '../../src/app';


describe('GET /api/v1/exercises/', () => {
    it('should return an array of exercises with the correct properties', async () => {
        const response = await request(app)
            .get('/api/v1/exercises/1/9');
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(expect.arrayContaining([
            expect.objectContaining({
                exercise_id: expect.any(Number),
                user_id: expect.anything(),  
                user_workout_id: expect.anything(),
                exercise_name: expect.any(String),
                exercise_weight: expect.any(Number),
                exercise_reps: expect.any(Number),
                exercise_sets: expect.anything(),
                exercise_completed: expect.any(Number),
                exercise_duration: expect.anything(),
                exercise_distance: expect.anything(),
                created_at: expect.any(String)
            })
        ]));
    });
});