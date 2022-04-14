import express from "express";
import indexRoute from '../route/index.route.js'
import adminRoute from '../route/admin.router.js'
import productRoute from '../route/product.router.js'
import userAuthenticateMdw from "./userAuthenticate.mdw.js";


export default function (app) {
    app.use('/', userAuthenticateMdw.userAuthentication, indexRoute);
    app.use('/admin', adminRoute);
    app.use('/product', productRoute);
}