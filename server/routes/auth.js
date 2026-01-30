import Express from 'express';
import {signin, signup} from '../controllers/auth.js';

const router = Express.Router();

router.post("/signup", signup);
router.post("/signin", signin);

export default router;