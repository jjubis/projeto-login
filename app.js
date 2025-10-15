const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const app = express();
const port = 5050;

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    secret: 'suaChaveSecreta',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

app.get('/', (req, res) => {
    res.render('login', { erro: null });
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (username === 'admin' && password === '12345') {
        req.session.isLoggedIn = true; 
        req.session.user = username;
        res.redirect('/dashboard');
    } else {
        res.render('login', { erro: 'Usuário ou senha inválidos' });
    }
});

function requireAuth(req, res, next) {
    if (req.session.isLoggedIn) {
        next();
    } else {
        res.redirect('/');
    }
}

app.get('/dashboard', requireAuth, (req, res) => {
    res.render('dashboard', { user: req.session.user });
});

app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.redirect('/dashboard');
        }
        res.redirect('/');
    });
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});