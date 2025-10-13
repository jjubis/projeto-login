const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const app = express();
const port = 5050;

// Configuração do EJS como view engine
app.set('view engine', 'ejs');

// Middleware para servir arquivos estáticos (CSS, JS)
app.use(express.static('public'));

// Middleware para processar dados de formulário
app.use(bodyParser.urlencoded({ extended: true }));

// Configuração de sessão (MUITO IMPORTANTE para o login)
app.use(session({
    secret: 'suaChaveSecreta', // Troque por uma string forte
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Use true se estiver em HTTPS
}));

// Rota de Login (GET) - Mostra o formulário
app.get('/', (req, res) => {
    res.render('login', { erro: null });
});

// Rota de Login (POST) - Processa a submissão
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Lógica de Autenticação (AQUI VOCÊ CHECARIA O BANCO DE DADOS)
    if (username === 'admin' && password === '12345') { // Exemplo simples
        req.session.isLoggedIn = true; // Marca o usuário como logado na sessão
        req.session.user = username;
        res.redirect('/dashboard');
    } else {
        res.render('login', { erro: 'Usuário ou senha inválidos' });
    }
});

// Middleware de autenticação (Protege rotas)
function requireAuth(req, res, next) {
    if (req.session.isLoggedIn) {
        next(); // Continua para a rota
    } else {
        res.redirect('/'); // Redireciona para o login
    }
}

// Rota de Dashboard (Protegida)
app.get('/dashboard', requireAuth, (req, res) => {
    res.render('dashboard', { user: req.session.user });
});

// Rota de Logout
app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.redirect('/dashboard');
        }
        res.redirect('/');
    });
});

// Inicia o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});