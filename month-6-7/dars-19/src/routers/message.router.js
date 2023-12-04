import { Router } from 'express';
import messageController from '../controllers/message.controller.js';

const router = Router();

router.get('/messages', messageController.GET);

export default router;
