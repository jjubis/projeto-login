const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const app = express();
const port = 5050;
const authRoutes = require('./routes/auth'); 

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    secret: 'suaChaveSecreta',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

app.use('/', authRoutes);

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${5050}`);
});