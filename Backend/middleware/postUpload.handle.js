import multer from 'multer';

const postUpload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 1024 * 1024 * 10
    }
});

export default postUpload;