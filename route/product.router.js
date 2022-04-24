import express from "express";
import accountService from "../service/account.service.js";
import productSevice from '../service/product.sevice.js';
import { mongoose } from 'mongoose';

const router = express.Router();

router.get('/byCat/:id', async (req, res) => {
    const CatID = req.params.id || 0;
    const postData = await productSevice.getListPostByCategory(CatID);
    res.render('search', {
        postData
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