const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');
const authMiddleware = require('../controllers/middlewares/authMiddleware'); 

router.get('/', authController.getLogin);
router.post('/login', authController.postLogin);
router.get('/dashboard', authMiddleware.requireAuth, authController.getDashboard);
router.get('/logout', authController.logout);

module.exports = router;