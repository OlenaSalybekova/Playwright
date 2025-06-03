import { test, expect } from '@playwright/test';
import axios from 'axios'; 

const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 5000,
});
api.interceptors.request.use(request => {
  console.log(`:arrow_right: ${request.method?.toUpperCase()} ${request.url}`, request.data || '');
  return request;
});
api.interceptors.response.use(response => {
  console.log(`:arrow_left: ${response.status} ${response.config.url}`, response.data);
  return response;
}, error => {
  console.error(':x: Error in response:', error.response?.status);
  return Promise.reject(error);
});
test.describe('JSONPlaceholder API Tests', () => {
  test('GET /posts/1 should return correct post', async () => {
    const response = await api.get('/posts/1');
    expect(response.status).toBe(200);
    expect(response.data).toMatchObject({ id: 1 });
  });
  test('GET /users/1 should return correct user with email', async () => {
    const response = await api.get('/users/1');
    expect(response.status).toBe(200);
    expect(response.data.id).toBe(1);
    expect(response.data.email).toContain('@');
  });
  test('POST /posts should create new post', async () => {
    const newPost = {
      title: 'Playwright test',
      body: 'Testing POST method',
      userId: 1
    };
    const response = await api.post('/posts', newPost);
    expect(response.status).toBe(201);
    expect(response.data.title).toBe(newPost.title);
  });
  test('PUT /posts/1 should update post', async () => {
    const updatedPost = {
      id: 1,
      title: 'Updated title',
      body: 'Updated content',
      userId: 1
    };
    const response = await api.put('/posts/1', updatedPost);
    expect(response.status).toBe(200);
    expect(response.data.title).toBe(updatedPost.title);
  });
  test('DELETE /posts/1 should delete post', async () => {
    const response = await api.delete('/posts/1');
    expect(response.status).toBe(200);
  });
});