import { RequestHandler, Router } from "express";

import { check } from "express-validator";

import * as ProductController from '../controllers/ProductController';
import { checkAuthMiddleware } from "../middlewares/CheckAuthMiddleware";
import fileUpload from "../middlewares/FileUpload";

const productRoutes = Router();

productRoutes.use(checkAuthMiddleware as RequestHandler);

productRoutes.get('/products', ProductController.getProducts);
productRoutes.get('/product/:pid', ProductController.getProductById);
productRoutes.post('/product', 
    fileUpload.single("audio"),
    [
        check("productName").not().isEmpty(),
        check("productDescription").not().isEmpty(),
        check("productPrice").not().isEmpty(),
    ], ProductController.createProduct);
productRoutes.put('/product/:pid', ProductController.modifyProduct);
productRoutes.delete('/product/:pid', ProductController.deleteProduct);

export default productRoutes;