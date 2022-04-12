import express from "express";
import registerController from '../controllers/register.controller.js';
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

router.get('/category', (req, res) => {
    res.render('category');
})

router.get('/search', (req, res) => {
    res.render('search');
})

router.get('/upload', (req, res) => {
    res.render('upload');
})

router.post('/register', registerController.post);

export default router;