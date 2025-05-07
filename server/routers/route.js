import express from 'express';
import userController from "../controllers/userController.js";

const router = express.Router();

router.get('/', (req, res) => {
    res.render('home');
});

router.get('/users', userController.view);
router.get('/users/create', userController.create);
router.post('/users-create', userController.store);


export default router;