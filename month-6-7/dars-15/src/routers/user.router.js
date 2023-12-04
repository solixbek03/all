import {  Router } from 'express'
import controller from '../controllers/user.controller.js'
import validate from '../middlewares/validate.js'

const router = Router()

router.post('/login', validate, controller.LOGIN)
router.get('/users',  controller.GET);
router.post('/register', validate, controller.REGISTER)
router.get('/checktoken', controller.TOKEN)


export default router;