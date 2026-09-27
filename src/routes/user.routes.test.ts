import request from 'supertest';
import app from '../app';

describe('User routes', () => {
  it('creates and fetches a user', async () => {
    const createRes = await request(app)
      .post('/api/v1/users')
      .send({ name: 'Ada Lovelace', email: 'ada@example.com' });

    expect(createRes.status).toBe(201);
    expect(createRes.body.data).toMatchObject({ name: 'Ada Lovelace', email: 'ada@example.com' });

    const id = createRes.body.data.id;

    const getRes = await request(app).get(`/api/v1/users/${id}`);
    expect(getRes.status).toBe(200);
    expect(getRes.body.data.id).toBe(id);
  });

  it('rejects invalid payloads', async () => {
    const res = await request(app).post('/api/v1/users').send({ email: 'not-an-email' });
    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
  });

  it('returns 404 for unknown user', async () => {
    const res = await request(app).get('/api/v1/users/00000000-0000-0000-0000-000000000000');
    expect(res.status).toBe(404);
  });
});
