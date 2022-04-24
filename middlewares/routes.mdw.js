import express from "express";
import indexRoute from '../route/index.route.js'
import adminRoute from '../route/admin.router.js'
import productRoute from '../route/product.router.js'
import { userData } from "./userData.mdw.js";
import { adminAuth } from "./admin.mdw.js";


export default function (app) {
    app.use('/',userData, indexRoute);
    app.use('/admin', adminAuth, adminRoute);
    app.use('/product', productRoute);

    app.use(function (err, req, res, next) {
        res.render('error/505', {
            layout: false,
        });
    });

    app.use(function (req, res, next) {
        res.render('error/404', {
            layout: false,
        });
    });
}
