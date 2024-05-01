import request from 'supertest';
import app from '../../src/app';




describe('POST /api/v1/progress/:userId', () => {
    it('should add a new progress and return the created progress entry', async () => {
        const newProgressData = {
            progress_date: new Date().toISOString().slice(0, 10),
            progress_weight: 75,
            progress_height: 180,
            progress_circumference_chest: 100,
            progress_circumference_waist: 80,
            progress_circumference_thigh_r: 60,
            progress_circumference_thigh_l: 60,
            progress_circumference_bicep_r: 32,
            progress_circumference_bicep_l: 32,
            progress_circumference_calves_r: 38,
            progress_circumference_calves_l: 38
        };

        const response = await request(app)
            .post('/api/v1/progress/1')
            .send(newProgressData);
        
        expect(response.statusCode).toBe(200);
        
    });
});

describe('GET /api/v1/progress/:userId/newest', () => {
    it('should return the newest progress record for a user', async () => {
        const response = await request(app)
            .get('/api/v1/progress/1');

        expect(response.statusCode).toBe(200);
        expect(response.body[0]).toEqual(expect.objectContaining({
            progress_id: expect.any(Number),
            user_id: 1,
            progress_image: null,
            progress_date: expect.any(String),
            progress_weight: expect.any(Number),
            progress_height: expect.any(Number),
            progress_circumference_chest: expect.any(Number),
            progress_circumference_waist: expect.any(Number),
            progress_circumference_thigh_r: expect.any(Number),
            progress_circumference_thigh_l: expect.any(Number),
            progress_circumference_bicep_r: expect.any(Number),
            progress_circumference_bicep_l: expect.any(Number),
            progress_circumference_calves_r: expect.any(Number),
            progress_circumference_calves_l: expect.any(Number)
        }));
    });
});