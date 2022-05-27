import { NextFunction, Request, Response } from 'express';
import Product from '../models/Product';
import HttpError from '../models/HttpError';

export const getProductDetails = async (req: Request, res: Response, next: NextFunction) => {
    const barcode = req.params.bid;

    console.log(barcode);

    let product;

    try{
        product = await Product.findOne({barcode: barcode});
    }
    catch(err){
        return next(new HttpError(500, "Something went wrong, could not find a product"));
    }

    if(!product){
        return next(new HttpError(404, "Could not find product for the provided id"));
    }

    return res.status(200).json({product: product.toObject({getters: true})});
}