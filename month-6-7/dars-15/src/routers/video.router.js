import { Router } from 'express';
import controller from '../controllers/video.controller.js';
import checkToken from '../middlewares/checkToken.js';
import validate from '../middlewares/validate.js';

const router = Router();

router.get('/videos', controller.GET);
router.get('/admin/videos', checkToken, validate, controller.GET);
router.post('/admin/videos', checkToken, validate, controller.POST)
router.put('/admin/videos/:videoId', checkToken, validate, controller.PUT);
router.delete('/admin/videos/:videoId', checkToken, validate, controller.DELETE);



export default router;
