import express from 'express';
import { registerUser, loginUser , refreshAccessToken, getUser, logoutUser, updateOnboarding} from '../controllers/auth.js';
import { protect } from '../middlewares/auth.js';

const router = express.Router();

//console.log("DEBUG:", { registerUser, loginUser, refreshAccessToken });

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/refresh', refreshAccessToken);
router.get('/user', protect, getUser);
router.post('/logout', protect, logoutUser)
router.put("/onboarding", protect, updateOnboarding);


export default router;