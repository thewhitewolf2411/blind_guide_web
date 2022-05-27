"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const MIME_TYPE_MAP = {
    'audio/mpeg3': 'mp3',
    'audio/x-mpeg-3': 'mp3'
};
const generateRandom = () => {
    const max = 9999999999999;
    const number = Math.floor(Math.random() * max);
    return number;
};
const fileUpload = (0, multer_1.default)({
    storage: multer_1.default.diskStorage({
        destination: (req, file, cb) => {
            let pathname = path_1.default.join(__dirname, '../storage/audio');
            //fs.mkdirSync(pathname);
            cb(null, pathname);
        },
        filename: (req, file, cb) => {
            const ext = MIME_TYPE_MAP[file.mimetype];
            cb(null, generateRandom() + '.mp3');
        }
    })
});
exports.default = fileUpload;
//# sourceMappingURL=FileUpload.js.map