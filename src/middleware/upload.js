import multer from "multer";

const storage = multer.memoryStorage(); // karena akan dikirim ke Firebase
const upload = multer({ storage });

export default upload;
