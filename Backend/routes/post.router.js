import { Router } from "express";
import { homepagePosts, likeComment, postController, profileController, viewpostController } from "../controllers/UserPosts.controller.js";
import middleauth from "../middleware/middle_auth.js";
import postUpload from "../middleware/postUpload.handle.js";
import checkFiletype from "../middleware/FileSecurityCheck.js";
import { MulterErrorUtil } from "../utilities/errorHandling.util.js";

const postRouter = Router();

postRouter.post('/postUpload', middleauth, postUpload.single("image"), checkFiletype, postController);
postRouter.put('/profileUpload', middleauth, postUpload.single("image"), checkFiletype, profileController);
postRouter.post('/homepage-posts', homepagePosts);

postRouter.use((err, req, res, next) => MulterErrorUtil(err, req, res, next));

postRouter.post('/viewposts', viewpostController);
postRouter.put('/inpost/:operation', middleauth, likeComment)

export default postRouter;