import { API, generateToken, faker } from './helpers/supertestHelper';

describe('Course Module API', () => {
  describe('POST /courses', () => {
    it('✅ Success: COACH can create a course', async () => {
      const { token } = generateToken('COACH');
      const res = await API()
        .post('/courses')
        .set('Authorization', `Bearer ${token}`)
        .send({
          title: faker.lorem.words(3),
          description: faker.lorem.paragraph(),
        });
      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty('id');
      expect(res.body).toHaveProperty('title');
    });

    it('❌ Forbidden: STUDENT cannot create a course', async () => {
      const { token } = generateToken('STUDENT');
      const res = await API()
        .post('/courses')
        .set('Authorization', `Bearer ${token}`)
        .send({
          title: faker.lorem.words(3),
          description: faker.lorem.paragraph(),
        });
      expect(res.status).toBe(403);
    });

    it('❌ Validation Error: Missing required fields', async () => {
      const { token } = generateToken('COACH');
      const res = await API()
        .post('/courses')
        .set('Authorization', `Bearer ${token}`)
        .send({});
      expect(res.status).toBe(400);
    });
  });

  describe('GET /courses', () => {
    it('✅ Success: Returns courses list', async () => {
      const res = await API().get('/courses');
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    });

    it('❌ Edge: Returns empty array when no courses exist', async () => {
      // assuming DB cleanup for test env
      const res = await API().get('/courses');
      expect(res.status).toBe(200);
      expect(res.body).toEqual([]);
    });
  });
});
