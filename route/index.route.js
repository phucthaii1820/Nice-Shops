import express from "express";
import accountService from "../service/account.service.js";
import {userAuth} from '../middlewares/userAuthenticate.mdw.js';
import multer from 'multer';
import productSevice from "../service/product.sevice.js";
import fs from "fs";

import '../auth/authG.js'
import passport from "passport";

const router = express.Router();

router.get('/', (req, res) => {
    res.render('home');
});

router.get('/login', (req,res) => {
    res.render('login');
});

router.post('/login', async(req,res) => {
    const user = await accountService.authenticate(req.body.phone,req.body.password);
    if (user){
        req.session.user = user;
        res.redirect('/');
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

const storage = multer.diskStorage({
    destination: function(req,file,cb){
      cb(null,'uploads')
    },
    filename: function(req,file,cb){
      cb(null,file.fieldname + '-' + Date.now())
    }
});
const upload = multer({storage:storage});

router.post('/upload', userAuth, upload.array('image'), async(req,res) => {
    const image = req.files;
    console.log(image);
    let listImg = [];
    image.forEach(function(item){
        let img = fs.readFileSync(item.path);
        let encode_image = img.toString('base64');

        let finalImg = {
            contentType: item.mimetype,
            data:  new Buffer.from(encode_image, 'base64')
        };
        listImg.push(finalImg);
    });
    await productSevice.addNewPost(req.session.user._id,req.body,listImg);
})

router.get('/register', (req,res) => {
    res.render('register');
});

router.get('/detail', (req,res) => {
    res.render('detail');
});

router.get('/manage', (req,res) => {
    res.render('manage');
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

router.get('/logout',(req,res) => {
    req.session.destroy();
    res.redirect('/');
});

router.get('/postManage', userAuth, (req,res) => {
    res.render('postManage');
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

export default router;