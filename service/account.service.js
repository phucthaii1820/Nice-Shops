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
    async createNewAccount(phone, password){
        const user = await Account.create({
            phone, password: crypto.hashPassword(password) 
        });
        return user;
    },
    async checkExistAccount(userPhone){
        await Account.exists({phone: userPhone});
    },
    async authenticate(phone, password){
        const user = await Account.findOne({phone: phone}).lean();
        if (!user) return null;
        if (!crypto.comparePassword(password,user.password)) return null;
        return user;
    },
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
