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
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const ProductController = __importStar(require("../controllers/ProductController"));
const CheckAuthMiddleware_1 = require("../middlewares/CheckAuthMiddleware");
const FileUpload_1 = __importDefault(require("../middlewares/FileUpload"));
const productRoutes = (0, express_1.Router)();
productRoutes.use(CheckAuthMiddleware_1.checkAuthMiddleware);
productRoutes.get('/products', ProductController.getProducts);
productRoutes.get('/product/:pid', ProductController.getProductById);
productRoutes.post('/product', FileUpload_1.default.single("audio"), [
    (0, express_validator_1.check)("productName").not().isEmpty(),
    (0, express_validator_1.check)("productDescription").not().isEmpty(),
    (0, express_validator_1.check)("productPrice").not().isEmpty(),
], ProductController.createProduct);
productRoutes.put('/product/:pid', ProductController.modifyProduct);
productRoutes.delete('/product/:pid', ProductController.deleteProduct);
exports.default = productRoutes;
//# sourceMappingURL=ProductRoutes.js.map