import multer from 'multer';
import fs from 'fs';
import path from 'path';
import publicDataConfig from '../config/userData/publicData.config.js';

const postUpload = multer({

    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            // fetching directory to save 
            const dirToSave = publicDataConfig
            //syncing saving path
            const dir = path.resolve(dirToSave, 'userData');
            const savingPath = path.join(dir, req.user._id.toString());

            if (!fs.existsSync(savingPath)) {
                console.log('not exist');
                fs.mkdirSync(savingPath, { recursive: true });
            }
            cb(null, savingPath);
        },

        filename: function (req, file, cb) {
            const fileName = file.originalname.split('.')[0] + Date.now() + '.' + file.mimetype.split('/')[1];
            cb(null, fileName)
        }
    }),
    
    limits: {
        fileSize: 1024 * 1024 * 10
    }
}
)
export default postUpload;