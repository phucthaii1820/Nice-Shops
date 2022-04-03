import express from "express";

const router = express.Router();

router.get('/', (req, res) => {
    let aActive = true;
    res.render('admin/account', {
        aActive,
        layout: 'admin.handlebars'
    });
})

router.get('/account', (req, res) => {
    let aActive = true;
    res.render('admin/account', {
        aActive,
        layout: 'admin.handlebars'
    });
})

router.get('/product', (req, res) => {
    let pActive = true;
    res.render('admin/product', {
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