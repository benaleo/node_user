import express from 'express';
import userController from "../controllers/userController.js";

const router = express.Router();

router.get('/', (req, res) => {
    res.render('home');
});

router.get('/users', userController.view);


export default router;