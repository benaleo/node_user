import express from 'express';
import userController from "../controllers/userController.js";
import upload from "../../config/multerConfig.js";

const router = express.Router();

router.get('/', (req, res) => {
    res.render('home');
});

router.get('/users', userController.view);
router.get('/users/create', userController.create);
router.post('/users/create', upload.single('avatar'), userController.store);
router.get('/users/edit/:id', userController.edit);
router.post('/users/edit/:id', upload.single('avatar'), userController.update);
router.delete('/users/delete/:id', userController.delete);


export default router;