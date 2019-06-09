// Пример авторизации


var express = require('express');
var cookieParser = require('cookie-parser'); // установить: $ npm install cookie-parser
var session = require('express-session'); // установить: $ npm install express-session
var bodyParser = require('body-parser'); // установлен уже
var path = require('path'); // установлен уже



var app = express();
app.use(cookieParser);
app.use(bodyParser.json());

var port = 8080;
var users = [
    { username: 'promushen', password: '12345' },
    { username: 'unclepetr', password: '1945' },
    { username: 'sylar47', password: '1313' }
];


// создание хранилища для сессий
// var sessionHandler = require('./session_handler'); // самописный модуль для использования MS SQL
// var store = sessionHandler.createStore();

var store;



// регистрируем обработчик чтобы парсить куки
app.use(cookieParser());

// создание сессии
app.use(session({
    store: store,
    resave: false,
    saveUninitialized: true,
    secret: 'supersecret'
    })
);

app.get('/', function (req, res) {
    console.log('Есть контакт!');
    res.sendFile(path.join(__dirname, 'index.html'))
});

app.post('/login', function (req, res) {
    var foundUser;
    // поиск пользователя в массиве пользователей

    for (var i = 0; i < users.length; i++) {
        var u = users[i];

        if (u.username === req.body.username && u.password === req.body.password) {
            foundUser = u.username;
            break
        }
    }

    if (foundUser !== undefined) {
        // аутентификация ок
        req.session.username = foundUser;
        console.log('Login succeeded: ', req.session.username);

        req.send('Login successful: ' + 'sessionID: ' + req.session.id + '; user: ' + req.session.username);
    } else {
        console.log('Login failed: ' + req.body.username);
        res.status(401).send('Login error');
    }


});


app.get('/check', function (req, res) {
    if (req.session.username) {
        res.set('Content-Type', 'text/html');
        res.send('<h2>User ' + req.session.username + ' is logged in </h2>')
    } else {
        res.send('Not logged in')
    }
});



/*
app.get('/login', function (req, res) {
    console.log(req.headers['user-agent']);
    res.send('Hello world!');
    //res.download('form.html');
});
*/

app.listen(port, function () {
    console.log('Listen on port ', port)
});
