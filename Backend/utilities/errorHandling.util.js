import multer from "multer";

export const MulterErrorUtil = (err, req, res, next) => 
    {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(413).json({ error: 'File too large. Max 10MB allowed.' });
    }
    return res.status(400).json({ error: err.message });
  }
  if (err) {
    console.log(err)
    return res.status(500).json({ error: 'Server error during file upload.' });
  }

  next();
}

