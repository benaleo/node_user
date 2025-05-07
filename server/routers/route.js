import express from 'express';
import userController from "../controllers/userController.js";

const router = express.Router();

router.get('/', (req, res) => {
    res.render('home');
});

router.get('/users', userController.view);
router.get('/users/create', userController.create);
router.post('/users/create', userController.store);
router.get('/users/edit/:id', userController.edit);
router.put('/users/edit/:id', userController.update);
router.delete('/users/delete/:id', userController.delete);


export default router;