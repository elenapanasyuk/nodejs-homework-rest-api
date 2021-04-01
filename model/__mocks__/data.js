const contacts = [
  {
    _id: "5f837f855ba83a4f1829ca5b",
    subscription: "pro",
    name: "Helen",
    email: "ivanova@mail.com",
    phone: "123456789",
    owner: "60511377829be847b7f46c33",
  },
  {
    _id: "5eb074232c30a1378dacdbe0",
    subscription: "free",
    name: "Ivan",
    email: "ivanov@mail.com",
    phone: "987654321",
    owner: "60511377829be847b7f46c33",
  },
];

const newContact = {
  name: "New",
  email: "new@mail.com",
  phone: "1111111111",
  subscription: "free",
};

const User = {
  _id: "60511377829be847b7f46c33",
  subscription: "free",
  token:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwNDc4MGIwYTMzZjU5M2I1ODY2ZDcwZCIsImlhdCI6MTYxNTMzNDc0NCwiZXhwIjoxNjE1MzM4MzQ0fQ.ZOul5xw2qGjRiFVXE4eKyIcJJ3ubRsVcmlXSm-KzNzg",
  email: "test007@ex.ua",
  password: "$2a$08$ebkI0zFk0IBoS",
  avatarURL: "60511377829be847b7f46c33/1616949412081-test-avatar.jpg",
  //avatarURL: "https://s.gravatar.com/avatar/d6ac26ce64657b23fce03f68f65dc6b4?s=250",
  //avatarURL: "60511377829be847b7f46c33\\1616949412081-test-avatar.jpg",
};

const users = [];
users[0] = User;

const newUser = { email: "test@test.com", password: "12345678" };

module.exports = { users, User, newUser, contacts, newContact };
