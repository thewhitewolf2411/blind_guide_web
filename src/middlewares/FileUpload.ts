import multer from "multer";
import fs from "fs";
import path from "path";

const MIME_TYPE_MAP = {
    'audio/mpeg3': 'mp3',
    'audio/x-mpeg-3': 'mp3'
}

const generateRandom = () => {
    const max = 9999999999999;
    const number = Math.floor(Math.random() * max);

    return number;
}

const fileUpload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            let pathname = path.join(__dirname, '../storage/audio');
            //fs.mkdirSync(pathname);
            cb(null, pathname);
        },
        filename: (req, file, cb) => {
            const ext = MIME_TYPE_MAP[file.mimetype];
            cb(null, generateRandom() + '.mp3');
        }
    })
});

export default fileUpload;