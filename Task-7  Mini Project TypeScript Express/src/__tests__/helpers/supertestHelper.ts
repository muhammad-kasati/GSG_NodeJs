import request from 'supertest';
import { faker } from '@faker-js/faker';
import app from '../../app'; // adjust path to your app entry
import jwt from 'jsonwebtoken';

const API = () => request(app);

// Fake JWT token generator
function generateToken(role: 'STUDENT' | 'COACH' | 'ADMIN') {
  const user = {
    id: faker.string.uuid(),
    email: faker.internet.email(),
    role,
  };
  const token = jwt.sign(user, process.env.JWT_SECRET || 'test-secret');
  return { user, token };
}

export { API, generateToken, faker };
