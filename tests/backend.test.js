const {getUser, getUsers, getUserInf, getUsersInf} = require('../backend/routes/routes');

test('Get User test', async () => {
  expect(getUser(5)).toHaveProperty('id', 5);
  expect(getUser(1)).toHaveProperty('name', 'Андрей');
  expect(getUser(2)).toHaveProperty('role', 'Пользователь');
  expect(getUser(9)).toHaveProperty('address', 'Almata');
})

test('Get Users test', async () => {
  expect(getUsers()).toBeTruthy();
})

test('Get UsersInf test', async () => {
  expect(getUsersInf()).toBeTruthy();
})

test('Get UserInf test', async () => {
  expect(getUserInf(5)).toHaveProperty('id', 5);
  expect(getUserInf(1)).toHaveProperty('joke');
})
