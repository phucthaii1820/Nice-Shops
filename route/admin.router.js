import express from "express";
import {getAcountById, getListAccount} from "../service/account.service.js";
import productSevice from "../service/product.sevice.js";
import accountSevice from "../service/account.service.js"

const router = express.Router();

router.get('/', async (req, res) => {
    let aActive = true;

    const listAccount = await getListAccount();

    for(let i = 0; i < listAccount.length; i++) {
        if(listAccount[i].gender == 0)
            listAccount[i].genderTemp = "Không xác định"
        else if (listAccount[i].gender == 1)
            listAccount[i].genderTemp = "Nam";
        else if (listAccount[i].gender == 2)
            listAccount[i].genderTemp = "Nữ";
        else
            listAccount[i].genderTemp = "Khác";
    }

    res.render('admin/account', {
        listAccount,
        aActive,
        layout: 'admin.handlebars'
    });
})

router.get('/account', async (req, res) => {
    let aActive = true;
    const listAccount = await getListAccount();

    for(let i = 0; i < listAccount.length; i++) {
        if(listAccount[i].gender == 0)
            listAccount[i].genderTemp = "Không xác định"
        else if (listAccount[i].gender == 1)
            listAccount[i].genderTemp = "Nam";
        else if (listAccount[i].gender == 2)
            listAccount[i].genderTemp = "Nữ";
        else
            listAccount[i].genderTemp = "Khác";
    }

    res.render('admin/account', {
        listAccount,
        aActive,
        layout: 'admin.handlebars'
    });
})

router.get('/product', async (req, res) => {
    let pActive = true;
    const listPost = await productSevice.getListPostNotImg();

    for(let i = 0; i < listPost.length; i++) {
        if(listPost[i].status == 0)
            listPost[i].statusTemp = "Mới"
        else
            listPost[i].statusTemp = "Cũ"

        if (listPost[i].statusPost == 0 )
            listPost[i].statusPostTemp = "Đang chờ xem xét"
        else if (listPost[i].statusPost == 1 )
            listPost[i].statusPostTemp = "Đã duyệt"
        else if (listPost[i].statusPost == 2 )
            listPost[i].statusPostTemp = "Bị từ chối"
        else
            listPost[i].statusPostTemp = "Đã bị ẩn"
    }

    res.render('admin/product', {
        listPost,
        pActive,
        layout: 'admin.handlebars'
    });
})


router.post('/product/deletePost', async (req,res) => {
    await productSevice.deleteProductById(req.body.ProID);
    res.redirect('/admin/product');
})

router.post('/product/deleteAccount', async (req,res) => {
    await accountSevice.deleteAccountById(req.body.id);
    res.redirect('/admin/Account');
})

router.get('/product-request', async (req, res) => {
    let rActive = true;

    const listPost = await productSevice.getListPostByStatusNotImg(0);

    for(let i = 0; i < listPost.length; i++) {
        if(listPost[i].status == 0)
            listPost[i].statusTemp = "Mới"
        else
            listPost[i].statusTemp = "Cũ"
    }

    res.render('admin/product-request', {
        listPost,
        rActive,
        layout: 'admin.handlebars'
    });
})

router.post('/account/add', async (req, res) => {
    await accountSevice.createNewAccount(req.body.phone, req.body.password);
    res.redirect('/admin/account');
})


router.post('/product-request/confirmPost', async (req, res) => {
    await productSevice.changStatusPostById(req.body.ProID, 1);
    res.redirect('/admin/product-request')
})

router.post('/product-request/refusePost', async (req, res) => {
    await productSevice.changStatusPostById(req.body.ProID, 2);
    res.redirect('/admin/product-request')
})

export default router;