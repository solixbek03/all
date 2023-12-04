import { Router } from 'express';
import messageController from '../controllers/message.controller.js';
import checkToken from '../middlewares/checkToken.js';

const router = Router();

router.get('/messages', checkToken, messageController.GET);

export default router;
