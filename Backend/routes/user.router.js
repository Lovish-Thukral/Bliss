import { Router } from "express";
import { findUser, signupUser, loginUser, deleteUser, logoutuser, editUser, checkusername, TokenAuthController, openProfile } from '../controllers/user.controller.js';
import middleauth from "../middleware/middle_auth.js";
import protectedLogin from "../middleware/protectedLogin.js";



const router = Router();

router.post('/signup', protectedLogin, signupUser);
router.post('/login', protectedLogin, loginUser); 
router.put('/edit/:field', middleauth, editUser);
router.post('/listuser', findUser);
router.get('/userprofile/:username', openProfile);
router.delete('/delete', middleauth, deleteUser);
router.post('/logout', middleauth, logoutuser);
router.post("/checkusername", checkusername );
router.post("/TokenVerify", middleauth, TokenAuthController )



export default router;
