import express from "express";

const router = express.Router();

router.get('/', (req, res) => {
    res.render('home');
});

router.get('/login',(req,res) => {
    res.render('login');
});

router.get('/register', (req,res) => {
    res.render('register');
});

router.get('/editprofile', (req,res) => {
    res.render('editprofile');
});

export default router;