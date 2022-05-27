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
exports.getProductDetails = void 0;
const Product_1 = __importDefault(require("../models/Product"));
const HttpError_1 = __importDefault(require("../models/HttpError"));
const getProductDetails = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const barcode = req.params.bid;
    console.log(barcode);
    let product;
    try {
        product = yield Product_1.default.findOne({ barcode: barcode });
    }
    catch (err) {
        return next(new HttpError_1.default(500, "Something went wrong, could not find a product"));
    }
    if (!product) {
        return next(new HttpError_1.default(404, "Could not find product for the provided id"));
    }
    return res.status(200).json({ product: product.toObject({ getters: true }) });
});
exports.getProductDetails = getProductDetails;
//# sourceMappingURL=MobileApiController.js.map