import Account from '../models/account.model.js';
import crypto from '../utils/crypto.js';

export const getListAccount = async () => {
    const listAccount = await Account.find();
    return listAccount;
}

export const getAcountById = async (idAccount) => {
    const account = await Account.findById(idAccount);
    if (!account)
        return null
    return account;
}

export default {
    async deleteAccountById(_id) {
        await Account.deleteOne( { _id } )
    },
    async createNewAccount(phone, password){
        const user = await Account.create({
            phone, password: crypto.hashPassword(password) 
        });
        return user;
    },
    async createNewAccountByG(phone, email, name){
        const user = await Account.create({
            phone,
            email,
            name
        });
        return user;
    },
    async checkExistAccount(userPhone){
       const user = await Account.exists({phone: userPhone});
       if (user)
           return true;
        return false;
    },
    async authenticate(phone, password){
        const user = await Account.findOne({phone: phone}).lean();
        if (!user) return null;
        if (!crypto.comparePassword(password,user.password)) return null;
        return user;
    },
    async getUserByEmail(userEmail) {
        const user = await Account.findOne({email: userEmail}).lean();
        if (!user) return null;
        return user;
    }
    ,
    async getUserById(userId){
        const user = await Account.findById(userId).lean();
        if (!user) return null;
        return user;
    },
    async Update(newInfo){
        const update = await Account.findByIdAndUpdate({_id: newInfo._id},
        {$set: {
            "name": newInfo.name,
            "email": newInfo.email,
            "gender": newInfo.gender,
            "address": newInfo.address,
            "cmnd": newInfo.cmnd,
            "dob": newInfo.dob
        }});
    } 
}
