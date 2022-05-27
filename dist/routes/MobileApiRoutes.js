"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const MobileApiController_1 = require("../controllers/MobileApiController");
const mobileApiRoutes = (0, express_1.Router)();
mobileApiRoutes.get('/get-product-details/:bid', MobileApiController_1.getProductDetails);
exports.default = mobileApiRoutes;
//# sourceMappingURL=MobileApiRoutes.js.map