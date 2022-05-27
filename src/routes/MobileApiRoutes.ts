import { Router } from "express";
import { getProductDetails } from '../controllers/MobileApiController';

const mobileApiRoutes = Router();

mobileApiRoutes.get('/get-product-details/:bid', getProductDetails);

export default mobileApiRoutes;