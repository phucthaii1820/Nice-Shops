import pkg from 'bcrypt';

export default {
    hashPassword(password){
        const round = 10;
        const salt = pkg.genSaltSync(round);
        return pkg.hashSync(password, salt);
    },
    comparePassword(plainTextPassword, hash){
        return pkg.compareSync(plainTextPassword, hash)
    }
}