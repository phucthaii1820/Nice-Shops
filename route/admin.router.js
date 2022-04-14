import express from "express";
import {getAcountById, getListAccount} from "../service/account.service.js";
import {getListPost} from "../service/product.sevice.js";

const router = express.Router();

router.get('/', async (req, res) => {
    let aActive = true;

    const listAccount = await getListAccount();

    res.render('admin/account', {
        listAccount,
        aActive,
        layout: 'admin.handlebars'
    });
})

router.get('/account', async (req, res) => {
    let aActive = true;
    const listAccount = await getListAccount();
    res.render('admin/account', {
        listAccount,
        aActive,
        layout: 'admin.handlebars'
    });
})

router.get('/product', async (req, res) => {
    let pActive = true;
    const listPost = await getListPost();
    res.render('admin/product', {
        listPost,
        pActive,
        layout: 'admin.handlebars'
    });
})

router.get('/product-request', (req, res) => {
    let rActive = true;
    res.render('admin/product-request', {
        rActive,
        layout: 'admin.handlebars'
    });
})

export default router;