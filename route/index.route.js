import express from "express";
import accountService from "../service/account.service.js";
import gender from '../config/gender.js';

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

router.get('/editProfile', (req,res) => {
    res.render('editprofile');
});

router.post('/editProfile', async(req,res) => {
    const user = req.session.user;
    const updateUser = req.body;
    /*console.log(user);*/
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

router.get('/profile', (req, res) => {
    res.render('profile');
});

router.get('/post-saved', (req, res) => {
    res.render('post-saved');
});

router.get('/category', (req, res) => {
    res.render('category');
});

router.get('/search', (req, res) => {
    res.render('search');
});

router.get('/upload', (req, res) => {
    res.render('upload');
});

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

router.get('/logout',(req,res) => {
    req.session.destroy();
    res.redirect('/');
});

export default router;