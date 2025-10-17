const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');
const authMiddleware = require('../controllers/middlewares/authMiddleware'); 

router.get('/', authController.getLogin);
router.post('/login', authController.postLogin);
router.get('/logout', authController.logout);
router.get('/dashboard/admin', authMiddleware.requireAdminAuth, authController.getAdminDashboard);
router.get('/dashboard/user', authMiddleware.requireUserAuth, authController.getUserDashboard);
router.get('/dashboard', authMiddleware.requireAuth, authController.getDashboard);

module.exports = router;