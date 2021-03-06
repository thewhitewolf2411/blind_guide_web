"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AuthController_1 = require("../controllers/AuthController");
const authRoutes = (0, express_1.Router)();
authRoutes.post('/login', AuthController_1.login);
exports.default = authRoutes;
//# sourceMappingURL=AuthRoutes.js.map