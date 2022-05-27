"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importStar(require("fs"));
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
const HttpError_1 = __importDefault(require("./models/HttpError"));
const AuthRoutes_1 = __importDefault(require("./routes/AuthRoutes"));
const ProductRoutes_1 = __importDefault(require("./routes/ProductRoutes"));
const MobileApiRoutes_1 = __importDefault(require("./routes/MobileApiRoutes"));
const UserSeeder_1 = __importDefault(require("./database/seeders/UserSeeder"));
const app = (0, express_1.default)();
const port = 5000;
app.use(body_parser_1.default.json());
app.use("/storage/audio", express_1.default.static(path_1.default.join("storage", "audio")));
app.use(express_1.default.static(path_1.default.join(__dirname, '/views/')));
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
    next();
});
//Authorisation Routes
app.use('/api', AuthRoutes_1.default);
//Mobile Routes
app.use('/api/mobile', MobileApiRoutes_1.default);
//Product Routes
app.use('/api/web', ProductRoutes_1.default);
app.get('/', (req, res) => {
    (0, fs_1.readFile)(__dirname + '/views/index.html', 'utf8', (err, text) => {
        res.send(text);
    });
});
app.use((req, res, next) => {
    throw new HttpError_1.default(404, "Could not find this route.");
});
app.use((error, req, res, next) => {
    if (req.file) {
        fs_1.default.unlink(req.file.path, (err) => {
            console.log(err);
        });
    }
    if (res.headerSent) {
        return next(error);
    }
    res
        .status(error.code || 500)
        .json({ message: error.message || "An unknown error occurred!" });
});
mongoose_1.default
    .connect("mongodb+srv://theWhiteWolf2411:fJKbT4qkOnKzp0Gp@cluster0.kvrmd.mongodb.net/saytel?retryWrites=true&w=majority")
    .then(() => {
    (0, UserSeeder_1.default)();
    app.listen(process.env.PORT);
})
    .catch((err) => {
    console.log(err);
});
//# sourceMappingURL=index.js.map