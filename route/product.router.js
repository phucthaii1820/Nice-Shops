import express from "express";
import accountService from "../service/account.service.js";
import productSevice from '../service/product.sevice.js';
import { mongoose } from 'mongoose';

const router = express.Router();

router.get('/byCat/:id', async (req, res) => {
    const CatID = req.params.id || 0;
    const page = req.query.page || 1;
    const limit = 8;

    const quantity = await productSevice.getQuantityOfPost(CatID);

    let nPage = Math.floor(quantity / limit);
    if (quantity.length % limit > 0) {
        nPage++;
    }

    const page_numbers = [];
    for (let i = 1; i <= nPage; i++) {
        page_numbers.push({
            value: i,
            isCurrent: +page === i
        });
    }

   const postData = await productSevice.getListPostPaging(limit * (page - 1), limit, CatID);

    res.render('search', {
        postData,
        page_numbers
    })
})

router.get('/detail/:id', async (req, res) => {
    const PostID = req.params.id || 0;
    const post = await productSevice.getPostById(PostID);
    let like = false;
    if (req.session.user){
        like = await accountService.checkPostMark(req.session.user._id,PostID);
    }
    res.render('detail', {
        post,
        like
    });
})

export default router;