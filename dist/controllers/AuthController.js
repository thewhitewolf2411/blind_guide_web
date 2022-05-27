"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const HttpError_1 = __importDefault(require("../models/HttpError"));
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    let existingUser;
    try {
        existingUser = yield User_1.default.findOne({ email: email });
        if (!existingUser) {
            //return res.status(403).json({message: "Could not log you in. Invalid Credentials."});
            return next(new HttpError_1.default(403, "Could not log you in. Invalid Credentials."));
        }
        let isValidPassword = false;
        isValidPassword = yield bcrypt_1.default.compare(password, existingUser.password);
        if (!isValidPassword) {
            //return res.status(403).json({message: "Could not log you in. Invalid Credentials."});
            return next(new HttpError_1.default(403, "Could not log you in. Invalid Credentials."));
        }
        const _token = jsonwebtoken_1.default.sign({ userId: existingUser.id, email: existingUser.email }, "IFTxAVOa61DELFkvNMu9", { expiresIn: '9999 years' });
        return res.status(200).json({ userId: existingUser.id, email: existingUser.email, token: _token, expirationDate: '9999 years' });
    }
    catch (err) {
        //return res.status(500).json({message: "Logging in failed, please try again later."});
        return next(new HttpError_1.default(500, "Logging in failed, please try again later."));
    }
});
exports.login = login;
//# sourceMappingURL=AuthController.js.map