import express from "express";
import indexRoute from '../route/index.route.js'
import adminRoute from '../route/admin.router.js'


export default function (app) {
    app.use('/', indexRoute);
    app.use('/admin', adminRoute);
}