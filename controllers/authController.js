// controllers/authController.js

// Simulação de "banco de dados" de usuários
const USERS = [
    { username: 'admin', password: '12345', role: 'admin' },   // Administrador
    { username: 'usuario', password: '6789', role: 'user' }    // Usuário Comum
];

const authController = {
    
    getLogin: (req, res) => {
        // Pega a mensagem de erro da sessão e a limpa para não aparecer novamente
        const errorMessage = req.session.erro;
        req.session.erro = null;
        res.render('login', { erro: errorMessage }); // Passa a variável 'erro' para o login.ejs
    },

    postLogin: (req, res) => {
        const { username, password } = req.body;

        // 1. Encontra o usuário
        const user = USERS.find(u => u.username === username && u.password === password);

        if (user) {
            // SUCESSO: Define as propriedades da sessão
            req.session.isLoggedIn = true; 
            req.session.user = user.username;
            req.session.role = user.role; 

            // CORREÇÃO CRUCIAL: Salvar a sessão explicitamente antes de redirecionar com sucesso
            req.session.save(() => {
                if (user.role === 'admin') {
                    return res.redirect('/dashboard/admin');
                } else if (user.role === 'user') {
                    return res.redirect('/dashboard/user'); // Redirecionamento de Usuário Comum
                }
                res.redirect('/dashboard'); 
            });

        } else {
            // FALHA: Armazena a mensagem de erro
            req.session.erro = 'Usuário ou senha inválidos';
            
            // CORREÇÃO CRUCIAL: Salvar a sessão explicitamente antes de redirecionar com falha
            req.session.save(() => {
                res.redirect('/');
            });
        }
    },
    
    // Controlador para o Dashboard de Administrador
    getAdminDashboard: (req, res) => {
        // Renderiza o dashboard.ejs
        res.render('dashboard', { user: req.session.user });
    },

    // Controlador para o Dashboard do Usuário Comum
    getUserDashboard: (req, res) => {
        // Renderiza o user_dashboard.ejs
        res.render('user_dashboard', { user: req.session.user });
    },

    // Rota /dashboard genérica (redireciona para a rota correta)
    getDashboard: (req, res) => {
        if (req.session.role === 'admin') {
            return res.redirect('/dashboard/admin');
        } else if (req.session.role === 'user') {
            return res.redirect('/dashboard/user');
        }
        res.redirect('/'); 
    },

    logout: (req, res) => {
        req.session.destroy((err) => {
            if (err) {
                return res.redirect('/');
            }
            res.redirect('/');
        });
    }
};

module.exports = authController;