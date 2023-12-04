import { Router } from 'express'
import userController from '../controllers/user.controller.js'


const router = Router()

router.post('/login', userController.LOGIN)
router.post('/register', userController.REGISTER);
router.get('/users', userController.GET);
router.get('/users/:token', userController.GET);



export default router;