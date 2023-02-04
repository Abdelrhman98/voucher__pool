import multer from 'multer';
const Multer = multer({
    // storage: multer.memoryStorage(),
    limits: { fieldSize: 2 * 1024 * 1024 },
});

export default Multer;