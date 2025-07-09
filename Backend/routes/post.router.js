import { Router } from "express";
import { postController, viewpostController } from "../controllers/UserPosts.controller.js";
import middleauth from "../middleware/middle_auth.js";
import postUpload from "../middleware/postUpload.handle.js";
import checkFiletype from "../middleware/FileSecurityCheck.js";
import { MulterErrorUtil } from "../utilities/errorHandling.util.js";


const postRouter = Router();

postRouter.put('/postUpload', middleauth, postUpload.single("image"), checkFiletype, postController);

postRouter.use((err, req, res, next) => MulterErrorUtil(err, req, res, next));

postRouter.get('/viewposts', viewpostController);

export default postRouter;