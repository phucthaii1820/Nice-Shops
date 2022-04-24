import express from "express";
import accountService from "../service/account.service.js";
import {userAuth} from '../middlewares/userAuthenticate.mdw.js';
import {userAuthAJAX} from '../middlewares/userAuthAJAX.mdw.js';
import multer from 'multer';
import productSevice from "../service/product.sevice.js";
import fs from "fs";

import '../auth/authG.js'
import passport from "passport";
import { resolveSoa } from "dns";
import sharp from "sharp";
import statusPost from "../config/statusPost.js";

const router = express.Router();

router.get('/', (req, res) => {
    res.render('home');
});

router.get('/login', (req,res) => {
    res.render('login', {referer:req.headers.referer});
});

router.post('/login', async(req,res) => {
    const user = await accountService.authenticate(req.body.phone,req.body.password);
    if (user){
        req.session.user = user;
        if (req.body.referer && (req.body.referer !== undefined && req.body.referer.slice(-6) !== "/login")) {
            res.redirect(req.body.referer);
        } else {
            res.redirect("/");
        }
    }
    else{
        res.render('login', {error: "Phone or password incorret"});
    }
});

router.get('/editProfile', userAuth, (req,res) => {
    const user = req.session.user;
    let isUndefine = false;
    let isMan = false;
    let isWoman = false;
    let isOther = false;
    if (user.gender === 0){
        isUndefine = true;
    }
    else if (user.gender === 1){
        isMan = true;
    }
    else if(user.gender === 2){
        isWoman = true;
    }
    else {
        isOther = true;
    }
    res.render('editprofile', {
        isUndefine,
        isMan,
        isWoman,
        isOther
    });
});

router.post('/editProfile', userAuth, async(req,res) => {
    const user = req.session.user;
    const updateUser = req.body;
    user.name = updateUser.name;
    user.email = updateUser.email;
    if (updateUser.gender === undefined){
        user.gender = 0;
    }
    user.gender = parseInt(updateUser.gender, 10);
    user.address = updateUser.address;
    user.cmnd = updateUser.cmnd;
    user.dob = updateUser.dob;
    req.session.user = user;
    await accountService.Update(user);
    res.redirect('/profile');
});

router.get('/profile', userAuth, (req, res) => {
    res.render('profile');
});

router.get('/user-profile', userAuth, (req, res) => {
    res.render('user-profile');
});

router.get('/post-saved', userAuth, (req, res) => {
    res.render('post-saved');
});

router.get('/category', (req, res) => {
    res.render('category');
});

router.get('/search', (req, res) => {
    res.render('search');
});

router.get('/upload', userAuth, (req, res) => {
    res.render('upload');
});

router.get('/forgetpassword', (req, res) => {
    res.render('forgetpassword');
});

router.get('/changepassword', (req, res) => {
    res.render('changepassword');
});

const storage = multer.memoryStorage();

const upload = multer({storage:storage});

const imageConfig = {
    quality: 70,
    chromaSubsampling: '4:4:4',
    force: true
}

const compress = (image) => 
        sharp(image)
            .jpeg(imageConfig)
            .toBuffer()
            .then(data => data)
            .catch(err => {throw err})

router.post('/upload', userAuth, upload.array('image'), async(req,res) => {
    const image = await Promise.all(req.files.map(async image => await compress(image.buffer)));
    console.log(image);
    await productSevice.addNewPost(req.session.user._id,req.body,image);
    res.redirect('/manage/pending_review');
})

router.get('/register', (req,res) => {
    res.render('register');
});

router.post('/register', async(req,res) => {
    if(await accountService.checkExistAccount(req.body.phone)){
        console.log('Username or email is already taken!');
        res.render('register', { error: 'Username or email is already taken!' });
    }else{
        const user = await accountService.createNewAccount(req.body.phone,req.body.password);
        console.log(user);
        req.session.user = user;
        res.redirect('/');
    }
});

router.get("/is-available", async (req, res) => {
    if(await accountService.checkExistAccount(req.query.user)) {
        return res.json(false);
    }
    return res.json(true);
})

router.get('/logout',(req,res) => {
    req.session.destroy();
    res.redirect('/');
});

router.get('/auth/google', passport.authenticate('google', { scope: [ 'email', 'profile' ] }
));

router.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    async function (req, res) {
        const email = req.user.emails[0].value
        const user = await accountService.getUserByEmail(email);
        if(user === null) {

            req.session.Gmail = {email: req.user.emails[0].value, name: req.user.displayName, isRegister: true}
            console.log(req.session.Gmail)
            res.redirect('/update-phone');
        }
        else {
            req.session.user = user;
            res.redirect('/');
        }

    }
);

router.get('/update-phone', (req, res) => {
    res.render('update-phone');
})

router.post('/update-phone', async (req, res) => {
    if(await accountService.checkExistAccount(req.body.phone)){
        res.render('register', { error: 'Your phone is already taken!' });
    }else{
        const user = await accountService.createNewAccountByG(req.body.phone,req.session.Gmail.email,req.session.Gmail.name);
        console.log(user);
        req.session.user = user;
        res.redirect('/');
    }
})

router.get('/manage/:status', userAuth, async(req,res) => {
    const status = req.params.status;
    let listPost = null;
    if (status === "pending_review"){
        listPost = await productSevice.getListPostOfUserByStatus(req.session.user._id,0);
    } else if(status === "published"){
        listPost = await productSevice.getListPostOfUserByStatus(req.session.user._id,1);
    } else if (status === "refused"){
        listPost = await productSevice.getListPostOfUserByStatus(req.session.user._id,2);
    } else if (status === "hidden"){
        listPost = await productSevice.getListPostOfUserByStatus(req.session.user._id,3);
    } else {
        listPost = await accountService.getBookmarkbyUserId(req.session.user._id);
    }
    res.render('manage', {
        listPost,
        status
    })
})

router.get('/updatePost/:id', userAuth, async(req,res) => {
    const id = req.params.id;
    const post = await productSevice.getPostById(id);
    res.render("updatePost",{post});
})
router.post('/update', upload.array('image'), userAuth, async(req,res) => {
    let image = [];
    if (req.files != []){
        image = await Promise.all(req.files.map(async image => await compress(image.buffer)));
    }
    await productSevice.updatePost(req.body,image);
    res.redirect('/manage/pending_review');
});

router.get('/hiddenPost/:id',userAuth ,async(req,res) => {
    await productSevice.updateStatus(req.params.id,statusPost.hidden);
    res.redirect('/manage/published');
});

router.get("/publishPost/:id",userAuth,async(req,res) => {
    await productSevice.updateStatus(req.params.id,statusPost.publised);
    res.redirect('/manage/hidden');
});

router.post("/search",async(req,res) => {
    let searchQ = req.body.searchContent.toLowerCase();
    const data = await productSevice.getListPostByStatus(statusPost.publised);
    let postData = [];
    data.forEach(item => {
        const title = item.title.toLowerCase();
        if (title.includes(searchQ)){
            postData.push(item);
        }
    });
    const isSearch = true
    res.render('search',{
        postData,
        isSearch
    });
});
router.get("/save",userAuthAJAX,async(req,res) => {
    const result = await accountService.addSavePost(req.session.user._id,req.query.idPost);
    return res.status(200).send({result: result.action});
});
export default router;