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
const bcrypt_1 = __importDefault(require("bcrypt"));
const User_1 = __importDefault(require("../../models/User"));
const seedDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.default.findOne({ email: 'amnadz@gmail.com' });
    if (!user) {
        const hashedPassword = yield bcrypt_1.default.hash('4y2wSZnHH8oG0gqHg3fq', 12);
        const seedUsers = [
            {
                name: 'Amna Džiho',
                email: 'amnadz@gmail.com',
                password: hashedPassword
            }
        ];
        yield User_1.default.deleteMany({});
        yield User_1.default.insertMany(seedUsers);
        console.log("User inserted");
    }
});
exports.default = seedDB;
//# sourceMappingURL=UserSeeder.js.map