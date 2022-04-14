import Account from '../models/account.model.js';

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
