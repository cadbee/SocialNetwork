var express = require('express');
var router = express.Router();
const path = require("path");
var user_inf = require('../json/userinf.json');
var pass = require('../json/pass.json');
var getJSON = require('get-json')

const users = require("../json/users.json");
const fs = require("fs");

function getUser(id){
  return users[id - 1];
}

function getUsers(){
  return users;
}

function getUserInf(id){
  return user_inf[id - 1];
}

function getUsersInf(){
  return user_inf;
}

function getJoke(){
  let res;
  getJSON("https://v2.jokeapi.dev/joke/Any?format=joke&type=single", function (error, response) {
    res = response.joke;
  });
  return res;
}

function getAbout(){
  let res;
  getJSON("https://baconipsum.com/api/?type=all-meat&sentences=5-6&format=json", function (error, response) {
    res = response[0];
  });
  return res;
}

router.get('/site', function (req, res, next) {
  res.json(users);
});

router.get('/', function (req, res, next) {
  //https://mlem.tech/api/randommlem
  users.forEach((v, i) => {
    getJSON("https://api.thecatapi.com/v1/images/search", function (error, response) {
      v.img = response[0].url;
    });
    getJSON("https://v2.jokeapi.dev/joke/Any?format=joke&type=single", function (error, response) {
      user_inf[i].joke = response.joke;
    });
    getJSON("https://baconipsum.com/api/?type=all-meat&sentences=5-6&format=json", function (error, response) {
      user_inf[i].about = response[0];
    });
  });
  fs.writeFileSync(path.resolve(__dirname, '../json/userinf.json'), JSON.stringify(user_inf, 0, 2));
  fs.writeFileSync(path.resolve(__dirname, '../json/users.json'), JSON.stringify(users, 0, 2));
});

router.get('/site/:id', (req, res) => {
  let i = users.map((x) => {
    return x.id
  }).indexOf(Number.parseInt(req.params.id));
  res.json([users[i]]);
});

router.get('/site/:id/inf', (req, res) => {
  let i = users.map((x) => {
    return x.id
  }).indexOf(Number.parseInt(req.params.id));
  res.json([user_inf[i]]);
});

router.get('/site/:id/friendsnews', (req, res) => {
  res.json(user_inf);
});

router.get('/login', (req, res) => {
  res.json(pass);
});

router.post('/site/:id', (req, res, next) => {
  const id = Number(req.params.id);
  if (Object.keys(req.body).includes("name")) {
    users[id - 1].name = req.body.name;
    users[id - 1].surname = req.body.surname;
    users[id - 1].role = req.body.role;
    users[id - 1].status = req.body.status;
  }
  if (Object.keys(req.body).includes("img")) {
    users[id - 1].img = req.body.img;
  }
  if (Object.keys(req.body).includes("age")) {
    users[id - 1].age = req.body.age;
    users[id - 1].date_of_birth = req.body.date_of_birth;
    users[id - 1].phone = req.body.phone;
    users[id - 1].address = req.body.address;
  }
  if (Object.keys(req.body).includes("joke")) {
    user_inf[id - 1].joke = req.body.joke;
    user_inf[id - 1].about = req.body.about;
    fs.writeFileSync(path.resolve(__dirname, '../json/userinf.json'), JSON.stringify(user_inf, 0, 2));
  }
  fs.writeFileSync(path.resolve(__dirname, '../json/users.json'), JSON.stringify(users, 0, 2));
});

router.post('/site/:id/addfriends', (req, res, next) => {
  const id = Number(req.params.id);
  users[id-1].friends = users[id - 1].friends.concat([req.body.id]);
  fs.writeFileSync(path.resolve(__dirname, '../json/users.json'), JSON.stringify(users, 0, 2));
});

router.post('/site/:id/delfriends', (req, res, next) => {
  const id = Number(req.params.id);
  let new_arr = [];
  for (let item of users[id - 1].friends){
    console.log(item);
    if(item != req.body.id){
      new_arr.push(item);
    }
  }
  users[id-1].friends = new_arr;
  fs.writeFileSync(path.resolve(__dirname, '../json/users.json'), JSON.stringify(users, 0, 2));
});

router.put('/site', function (req, res) {
  data = req.body;
  users[req.body.id - 1] = {
    name: data.name,
    surname: data.surname,
    address: data.address,
    phone: data.phone,
    age: data.age,
    date_of_birth: data.date_of_birth,
    id: data.id,
    role: "Пользователь",
    status: "Не подтвержден",
    email: data.email,
    img: data.img,
    friends: []
  };
  user_inf[data.id-1]={
    id: data.id,
    joke: "Write here your news!",
    about: "Tell me about yourself!",
  }
  pass[data.id-1]={
    id: data.id,
    login: data.login,
    pass: data.password
  }
  fs.writeFileSync(path.resolve(__dirname, '../json/users.json'), JSON.stringify(users, 0, 2));
  fs.writeFileSync(path.resolve(__dirname, '../json/userinf.json'), JSON.stringify(user_inf, 0, 2));
  fs.writeFileSync(path.resolve(__dirname, '../json/pass.json'), JSON.stringify(pass, 0, 2));
});

module.exports = {router, getUser, getUsers, getUserInf, getUsersInf};


