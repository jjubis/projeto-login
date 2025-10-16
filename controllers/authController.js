
const authController = {
    
    getLogin: (req, res) => {
        res.render('login', { erro: null });
    },

    postLogin: (req, res) => {
        const { username, password } = req.body;
        if (username === 'admin' && password === '12345') {
            req.session.isLoggedIn = true; 
            req.session.user = username;
            res.redirect('/dashboard');
        } else {
            res.render('login', { erro: 'Usuário ou senha inválidos' });
        }
    },
    
    getDashboard: (req, res) => {
        res.render('dashboard', { user: req.session.user });
    },

    logout: (req, res) => {
        req.session.destroy((err) => {
            if (err) {
                return res.redirect('/dashboard');
            }
            res.redirect('/');
        });
    }
};

module.exports = authController;