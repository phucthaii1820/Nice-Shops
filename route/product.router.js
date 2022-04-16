import express from "express";
import {getListPostByCategory, getPostById} from '../service/product.sevice.js'

const router = express.Router();

router.get('/byCat/:id', async (req, res) => {
    const CatID = req.params.id || 0;
    const postData = await getListPostByCategory(CatID);
    res.render('search', {
        postData
    })
})

router.get('/detail/:id', async (req, res) => {
    const PostID = req.params.id || 0;
    const post = await getPostById(PostID);
})

export default router;