const { test, expect } = require ('@playwright/test');
const fs = require ('fs');
//Positive case:

test ('Signup with random credential', async ({page}) => {
    const randomID = Math.floor(Math.random() *10000);
    const email = `user${randomID}@gmail.com`;
    const password = `Pass${randomID}!`;
 await page.goto ('https://guest:welcome2qauto@qauto.forstudy.space');
 await page.getByRole ('button', { name: 'Sign up' }).click();
 await expect (page.getByRole ('button', {name: 'Register' })).toBeDisabled();
 await page.fill ('#signupName', 'Brenda');
 await page.fill ('#signupLastName', 'Testovna');
 await page.fill ('#signupEmail', email);
 await page.fill ('#signupPassword', password);
 await page.fill ('#signupRepeatPassword', password);
 const registerButton = page.getByRole ('button', {name: 'Register' });
 await expect (registerButton).toBeEnabled();
 await registerButton.click();


 const credentials = { email, password };
 fs.writeFileSync ('credentials.json', JSON.stringify(credentials, null, 2));
});

//Negative cases:
//Name: 

test ('Name - Empty field, wrong data/lenght', async ({page}) => {
 await page.goto ('https://guest:welcome2qauto@qauto.forstudy.space');
 await page.getByRole ('button', { name: 'Sign up' }).click();
 await expect (page.getByRole ('button', {name: 'Register' })).toBeDisabled();
 // 1:
 await page.fill ('#signupName', '');
 await page.click('body');
 await expect (page.getByText('Name required')).toBeVisible();
// 2:
 await page.fill ('#signupName', '111');
 await page.click('body');
 await expect (page.getByText('Name is invalid')).toBeVisible();
// 3:
 await page.fill ('#signupName', 'Tetstjhjygfyfgjfgjegfgjhb');
 await page.click('#signupLastName');
 await expect (page.getByText('Name has to be from 2 to 20 characters long')).toBeVisible();

});

//Last name:

test ('Last Name - Empty field, wrong data/lenght', async ({page}) => {
 await page.goto ('https://guest:welcome2qauto@qauto.forstudy.space');
 await page.getByRole ('button', { name: 'Sign up' }).click();
 await expect (page.getByRole ('button', {name: 'Register' })).toBeDisabled();
 // 4:
 await page.fill ('#signupLastName', '');
 await page.click('body');
 await expect (page.getByText('Last name required')).toBeVisible();
// 5:
 await page.fill ('#signupLastName', '97');
 await page.click('body');
 await expect (page.getByText('Last name is invalid')).toBeVisible();
// 6:
 await page.fill ('#signupLastName', 'Tetstjhjygfyfgjfgjegfgjhb');
 await page.click('body');
 await expect (page.getByText('Last name has to be from 2 to 20 characters long')).toBeVisible();

});

//Email:

test ('Email - Empty field, wrong data', async ({page}) => {
 await page.goto ('https://guest:welcome2qauto@qauto.forstudy.space');
 await page.getByRole ('button', { name: 'Sign up' }).click();
 await expect (page.getByRole ('button', {name: 'Register' })).toBeDisabled();
 // 7:
 await page.fill ('#signupEmail', '');
 await page.click('#signupLastName');
 await expect (page.getByText('Email required')).toBeVisible();
// 8:
 await page.fill ('#signupEmail', 'user123@');
 await page.click('body');
 await expect (page.getByText('Email is incorrect')).toBeVisible();
// 9:
 await page.fill ('#signupEmail', '12@com');
 await page.click('body');
 await expect (page.getByText('Email is incorrect')).toBeVisible();

});

//Password:

test ('Password - Empty field, wrong data', async ({page}) => {
 await page.goto ('https://guest:welcome2qauto@qauto.forstudy.space');
 await page.getByRole ('button', { name: 'Sign up' }).click();
 await expect (page.getByRole ('button', {name: 'Register' })).toBeDisabled();
 // 10:
 await page.fill ('#signupPassword', '');
 await page.click('body');
 await expect (page.getByText('Password required')).toBeVisible();
// 11:
 await page.fill ('#signupPassword', 'user123@');
 await page.click('body');
 await expect (page.getByText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter')).toBeVisible();
// 12:
 await page.fill ('#signupPassword', 'USERTESTER1221123@');
 await page.click('body');
 await expect (page.getByText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter')).toBeVisible();
});