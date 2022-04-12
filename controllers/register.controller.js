import Account from '../models/account.model.js';
import crypto from '../utils/crypto.js';

const createNewAccount = async(phone, password) => {
    const user = await Account.create({
        phone, password: crypto.hashPassword(password) 
    });
    return user;
};

const checkExistAccount = async(userPhone) => await Account.exists({phone: userPhone});

const post = async(req,res) => {
    if(await checkExistAccount(req.body.phone)){
        console.log('Username or email is already taken!');
        res.render('register', { error: 'Username or email is already taken!' });
    }else{
        const user = await createNewAccount(req.body.phone,req.body.password);
        console.log(user);
        res.locals.user = user;
        res.render('home');
    }
}
export default {
    post
}