# SocialNetwork
Node.js, Express and Angular social network application. 

[DEMO](https://socialnetwork-qeam.onrender.com) `Login: admin Password: admin`

Web-приложение, обеспечивающее использование пользователем социальной сети. Пользователь может зарегистрироваться в социальной сети. Может добавить или удалить свою фотографию, может управлять своими друзьями в социальной сети, может добавить сообщение (новость) на свою страницу, может просматривать список новостей своих друзей.

1. Приложение получает исходные данные в виде JSON-файла.
2. В качестве сервера используется Node.JS с модулем express.
3. Если пользователь является администратором, то у него есть возможность редактирования страниц других пользователей.
4. WebSocket. Переписка и страница новостей обновляются сразу после появления сообщений и новостей от пользователей без необходимости обновлять страницу целиком.
5. Разработаны тесты для серверной части web-приложения с использованием Jest.
6. Все элементы управления реализованы с использованием компонентов Angular. Взаимодействие между компонентами реализовано с использованием сервисов Angular.
7. Для реализации эффектов на HTML-страницах используются директивы Angular.


## Development server

1. Run `npm install`. 
2. Run `npm run server` for a local server.
3. Run `npm start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Preview

|![image](https://user-images.githubusercontent.com/71726365/221402625-acee1903-8afa-45c9-9006-b29a2c15d996.png)|
|:--:| 
| *Login page* |

![image](https://user-images.githubusercontent.com/71726365/221402686-2f35bf48-319f-49a3-9012-b8e29fd1242d.png)
|:--:| 
| *User profile* |

![image](https://user-images.githubusercontent.com/71726365/221402715-a36b779f-784c-4916-b5d1-b5c79870245b.png)
|:--:| 
| *News* |
