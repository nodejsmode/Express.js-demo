var cookieParser = require('cookie-parser');
var session = require('express-session');

// создаем хранилище в базе данных
var MSSQLStore = require('connect-mssql')(session);
var mssql = require('mssql');

module.exports = {
    createStore: function() {
        var config = {
            user: 'test',       // пользователь БД
            password: '12345',  // его пароль
            server: 'localhost', // сервер MS SQL
            database: 'testdb',  // имя БД
            port: 1443,         // порт на котором БД
            pool: {
                max: 10,        // максимальное количество соединений пула
                min: 0,          // минимальное --//--
                idleTimeoutMillis: 30000 // время ожидания перед завершением неиспользуемого соединения
            }
        }

        return new MSSQLStore(config)
    }
}