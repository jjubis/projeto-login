// controllers/middlewares/authMiddleware.js

// Middleware 1: Garante que o usuário esteja logado (qualquer role)
const requireAuth = (req, res, next) => {
    if (req.session.isLoggedIn) {
        next();
    } else {
        req.session.erro = 'Você precisa estar logado para acessar esta página.';
        res.redirect('/');
    }
};

// Middleware 2: Garante que o usuário logado seja Administrador
const requireAdminAuth = (req, res, next) => {
    // Verifica se está logado E se a role é 'admin'
    if (req.session.isLoggedIn && req.session.role === 'admin') {
        next();
    } else {
        // Redireciona com uma mensagem de acesso negado
        req.session.erro = 'Acesso Negado. Apenas Administradores podem acessar esta área.';
        res.redirect('/'); 
    }
};

// Middleware 3: Garante que o usuário logado seja Usuário Comum
const requireUserAuth = (req, res, next) => {
    // Verifica se está logado E se a role é 'user'
    if (req.session.isLoggedIn && req.session.role === 'user') {
        next();
    } else {
        // Redireciona com uma mensagem de acesso negado
        req.session.erro = 'Acesso Negado. Você não tem permissão para acessar esta área.';
        res.redirect('/');
    }
};

module.exports = {
    requireAuth,
    requireAdminAuth,
    requireUserAuth
};