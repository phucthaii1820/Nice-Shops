import pkg from 'bcrypt';
const {bcrypt} = pkg;

const hashPassword = (password) =>{
    const round = 10;
    const salt = pkg.genSaltSync(round);
    return pkg.hashSync(password, salt);
}

const comparePassword = (plainTextPassword, hash) => {
    return pkg.compareSync(plainTextPassword, hash);
}

export default {
    hashPassword,
    comparePassword
}