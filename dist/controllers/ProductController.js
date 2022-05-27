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
exports.deleteProduct = exports.modifyProduct = exports.createProduct = exports.getProductById = exports.getProducts = void 0;
const express_validator_1 = require("express-validator");
const HttpError_1 = __importDefault(require("../models/HttpError"));
const Product_1 = __importDefault(require("../models/Product"));
const getProducts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let products;
    let numberOfResults = 10;
    let page = 1;
    let totalProducts = 0;
    let numberOfPages = 1;
    if (req.query.numberofresults && req.query.page) {
        numberOfResults = parseInt(req.query.numberofresults.toString());
        page = parseInt(req.query.page.toString());
    }
    if (numberOfResults && page) {
        try {
            products = yield Product_1.default.find().skip(page * numberOfResults - numberOfResults).limit(numberOfResults);
            totalProducts = yield Product_1.default.find().count();
            numberOfPages = totalProducts === 0 ? 1 : Math.ceil(totalProducts / numberOfResults);
        }
        catch (err) {
            const error = new HttpError_1.default(500, "Something went wrong.");
            return next(error);
        }
    }
    else {
        try {
            products = yield Product_1.default.find();
        }
        catch (err) {
            const error = new HttpError_1.default(500, "Something went wrong.");
            return next(error);
        }
    }
    if (!products) {
        const error = new HttpError_1.default(404, "There are no clients.");
        return next(error);
    }
    res.status(200).json({ products: products.map((product) => product.toObject({ getters: true })), numberOfPages });
});
exports.getProducts = getProducts;
const getProductById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const productId = req.params.pid;
    let product;
    try {
        product = yield Product_1.default.findById(productId);
    }
    catch (err) {
        return next(new HttpError_1.default(500, "Something went wrong, could not find a client"));
    }
    if (!product) {
        return next(new HttpError_1.default(404, "Could not find client for the provided id"));
    }
    return res.status(200).json({ product: product.toObject({ getters: true }) });
});
exports.getProductById = getProductById;
const createProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const validationErrors = (0, express_validator_1.validationResult)(req);
    if (!validationErrors.isEmpty()) {
        return next(new HttpError_1.default(422, "Invalid inputs passed, please check your data."));
    }
    const { productName, productDescription, productPrice } = req.body;
    let barcode = generateBarcode();
    const numberOfItems = yield Product_1.default.find({ barcode: barcode }).count();
    while (numberOfItems > 0) {
        barcode = generateBarcode();
    }
    const createdProduct = new Product_1.default({
        productName,
        productDescription,
        productPrice,
        barcode,
        audioLink: req.file.path,
    });
    try {
        yield createdProduct.save();
    }
    catch (error) {
        const errorMessage = new HttpError_1.default(500, "Creating place failed, please try again.");
        return next(errorMessage);
    }
    res.status(201).json({ createdProduct: createdProduct.toObject({ getters: true }) });
});
exports.createProduct = createProduct;
const modifyProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const validationErrors = (0, express_validator_1.validationResult)(req);
    if (!validationErrors.isEmpty()) {
        return next(new HttpError_1.default(422, "Invalid inputs passed, please check your data."));
    }
    const { productName, productDescription, productPrice } = req.body;
    const productId = req.params.pid;
    let product;
    try {
        product = yield Product_1.default.findById(productId);
    }
    catch (err) {
        const error = new HttpError_1.default(500, "Something went wrong, could not find a product.");
        return next(error);
    }
    const audioLink = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";
    product.productName = productName;
    product.productDescription = productDescription;
    product.productPrice = productPrice;
    product.audioLink = audioLink;
    product.updated_at = new Date();
    try {
        yield product.save();
    }
    catch (err) {
        const error = new HttpError_1.default(500, "Something went wrong, could not update place.");
        return next(error);
    }
    res.status(200).json({ product: product.toObject({ getters: true }) });
});
exports.modifyProduct = modifyProduct;
const deleteProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const productId = req.params.pid;
    let product;
    try {
        product = yield Product_1.default.findById(productId);
    }
    catch (err) {
        const error = new HttpError_1.default(500, "Something went wrong, could not find a product.");
        return next(error);
    }
    if (!product) {
        return next(new HttpError_1.default(404, "Could not find a product for this id."));
    }
    try {
        yield product.remove();
    }
    catch (err) {
        const error = new HttpError_1.default(500, "Something went wrong, could not delete a product.");
        return next(error);
    }
    res.status(200).json({ message: "Deleted product.", status: 200 });
});
exports.deleteProduct = deleteProduct;
const generateBarcode = () => {
    const max = 99999999;
    const number = Math.floor(Math.random() * max);
    return number;
};
//# sourceMappingURL=ProductController.js.map