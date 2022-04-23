import express from "express";
import productSevice from '../service/product.sevice.js'

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
    const user = req.session.user;
    let like = false;
    if (user){
        like = user.postmark.includes(PostID);
    }
    res.render('detail', {
        post,
        like
    });
})

export default router;