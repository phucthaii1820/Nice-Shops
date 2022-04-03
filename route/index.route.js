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
router.get('/profile', (req, res) => {
    res.render('profile');
})

router.get('/post-saved', (req, res) => {
    res.render('post-saved');
})


export default router;