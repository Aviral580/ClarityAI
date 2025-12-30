import express from 'express';
import { registerUser, loginUser , refreshAccessToken, getUser, logoutUser} from '../controllers/auth.js';
import { protect } from '../middlewares/auth.js';

const router = express.Router();

//console.log("DEBUG:", { registerUser, loginUser, refreshAccessToken });

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/refresh', refreshAccessToken);
router.post('/user', protect, getUser);
router.post('/logout', protect, logoutUser)



export default router;