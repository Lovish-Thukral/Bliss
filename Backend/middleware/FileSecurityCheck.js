import { fileTypeFromBuffer } from 'file-type';

const checkFiletype = async (req, res, next) => {
    if (!req.file) return next(); // skip if no file uploaded

    try {
        const buffer = req.file.buffer;
        const type = await fileTypeFromBuffer(buffer);

        const allowedMimeTypes = [
            "image/jpeg",
            "image/png",
            "image/webp",
            "video/mp4",
            "video/quicktime",
            "video/3gpp",
            "video/mpeg",
            "video/x-m4v"
        ];

        if (!type || !allowedMimeTypes.includes(type.mime)) {
            return res.status(415).json({
                message: "Invalid file type",
                status: "operation failed"
            });
        }

        console.log('File type checking successful');
        next();
    } catch (error) {
        console.error("File validation failed:", error);
        res.status(500).json({ message: "File validation failed", error: error.message });
    }
};

export default checkFiletype;
