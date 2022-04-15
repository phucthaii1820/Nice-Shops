import express from "express";
import indexRoute from '../route/index.route.js'
import adminRoute from '../route/admin.router.js'
import productRoute from '../route/product.router.js'
import { userData } from "./userData.mdw.js";


export default function (app) {
    app.use('/',userData, indexRoute);
    app.use('/admin', adminRoute);
    app.use('/product', productRoute);
}