const { test, expect, request } = require('@playwright/test');

test('Create car via API', async () => {
  const apiContext = await request.newContext();

  const loginResponse = await apiContext.post('https://qauto.forstudy.space/api/auth/signin', {
    data: {
      email: 'user7481@gmail.com',
      password: 'Pass7481!'
    }
  });

  expect(loginResponse.status()).toBe(200);
  const loginBody = await loginResponse.json();
  const accessToken = loginBody.accessToken;
 

  const createCarPayload = {
    carBrandId: 1,
    carModelId: 1,
    initialMileage: 133
  };

  const createResponse = await apiContext.post('https://qauto.forstudy.space/api/cars', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    data: createCarPayload
  });

  const responseBody = await createResponse.json();
  console.log('Create car response status:', createResponse.status());
  console.log('Create car response body:', responseBody);

  expect(responseBody.status).toBe('ok');
  expect(responseBody.data).toHaveProperty('id');
  expect(responseBody.data.carBrandId).toBe(createCarPayload.carBrandId);
  expect(responseBody.data.carModelId).toBe(createCarPayload.carModelId);
  expect(responseBody.data.initialMileage).toBe(createCarPayload.initialMileage);
});

