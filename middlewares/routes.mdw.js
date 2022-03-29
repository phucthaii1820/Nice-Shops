import express from "express";
import indexRoute from '../route/index.route.js'


export default function (app) {
    app.use('/', indexRoute);
}