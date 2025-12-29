import express from 'express';
import { registerUser, loginUser , refreshAccessToken} from '../controllers/auth.js';

const router = express.Router();

console.log("DEBUG:", { registerUser, loginUser, refreshAccessToken });

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/refresh', refreshAccessToken);



export default router;