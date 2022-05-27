import {NextFunction, Request, Response} from 'express';
import { validationResult } from 'express-validator';
import mongoose from 'mongoose';
import HttpError from '../models/HttpError';

import Product from '../models/Product';
import User from '../models/User';

export const getProducts = async (req: Request, res: Response, next: NextFunction) => {

    let products;
    let numberOfResults = 10;
    let page = 1;
    let totalProducts = 0;
    let numberOfPages = 1;


    if(req.query.numberofresults && req.query.page){
        numberOfResults = parseInt(req.query.numberofresults.toString());
        page = parseInt(req.query.page.toString());
    }

    if(numberOfResults && page){
        try{
            products = await Product.find().skip(page * numberOfResults - numberOfResults).limit(numberOfResults);
            totalProducts = await Product.find().count();
            numberOfPages = totalProducts === 0 ? 1 : Math.ceil(totalProducts / numberOfResults);
        } catch(err){
            const error = new HttpError(500, "Something went wrong.");
            return next(error);
        }
    }
    else{
        try{
            products = await Product.find();
        } catch(err){
            const error = new HttpError(500, "Something went wrong.");
            return next(error);
        }
    }

    if (!products) {
        const error = new HttpError(404, "There are no clients.");
        return next(error);
      }
    
    res.status(200).json({products: products.map((product) => product.toObject({getters: true})), numberOfPages});
}

export const getProductById = async(req: Request, res: Response, next: NextFunction) => {

    const productId = req.params.pid;

    let product;

    try{
        product = await Product.findById(productId);
    }
    catch(err){
        return next(new HttpError(500, "Something went wrong, could not find a client"));
    }

    if(!product){
        return next(new HttpError(404, "Could not find client for the provided id"));
    }

    return res.status(200).json({product: product.toObject({getters: true})});

}

export const createProduct = async(req: Request, res: Response, next: NextFunction) => {
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
        return next(new HttpError(422, "Invalid inputs passed, please check your data."));
    }

    const { productName, productDescription, productPrice } = req.body;

    let barcode = generateBarcode();
    const numberOfItems = await Product.find({barcode: barcode}).count();

    while(numberOfItems > 0){
        barcode = generateBarcode();
    }

    const createdProduct = new Product({
        productName,
        productDescription,
        productPrice,
        barcode,
        audioLink: req.file.path,
      });
    
      try {
        await createdProduct.save();
      } catch (error) {
        const errorMessage = new HttpError(500, "Creating place failed, please try again.");
        return next(errorMessage);
      }
    
      res.status(201).json({ createdProduct: createdProduct.toObject({ getters: true }) });

}

export const modifyProduct = async(req: Request, res: Response, next: NextFunction) => {
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
        return next(new HttpError(422, "Invalid inputs passed, please check your data."));
    }

    const { productName, productDescription, productPrice } = req.body;

    const productId = req.params.pid;

    let product;
    try {
        product = await Product.findById(productId);
    } catch (err) {
      const error = new HttpError(500, "Something went wrong, could not find a product.");
      return next(error);
    }

    const audioLink = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";

    product.productName = productName;
    product.productDescription = productDescription;
    product.productPrice = productPrice;
    product.audioLink = audioLink;
    product.updated_at = new Date();

    try {
        await product.save();
      } catch (err) {
        const error = new HttpError(500, "Something went wrong, could not update place.");
        return next(error);
      }
    
      res.status(200).json({ product: product.toObject({ getters: true }) });
}

export const deleteProduct = async(req: Request, res: Response, next: NextFunction) => {
    const productId = req.params.pid;

    let product;

    try {
        product = await Product.findById(productId);
    } catch (err) {
      const error = new HttpError(500, "Something went wrong, could not find a product.");
      return next(error);
    }
  
    if (!product) {
      return next(new HttpError(404, "Could not find a product for this id."));
    }
  
    try {
      await product.remove();  
    } catch (err) {
      const error = new HttpError(500, "Something went wrong, could not delete a product.");
      return next(error);
    }
  
    res.status(200).json({ message: "Deleted product.", status: 200 });
}

const generateBarcode = () => {
    const max = 99999999;
    const number = Math.floor(Math.random() * max);

    return number;
}