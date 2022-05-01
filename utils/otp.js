import otpGenerator from 'otp-generator';
import Otp from '../models/otp.model.js'
import crypto from '../utils/crypto.js';

export default {
    async createOTP(number) {
        const OTP = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false , lowerCaseAlphabets: false   });
        const otp = new Otp({ number: number, otp: crypto.hashPassword(OTP) });
        const result = await otp.save();
        return OTP;
    },
    async verifyOTP(phone,OTP){
        const OtpHolder = await Otp.find({number: phone});
        if (OtpHolder.length === 0) return null;
        const rightOtp = OtpHolder[OtpHolder.length - 1];
        const validUser = crypto.comparePassword(OTP,rightOtp.otp);
        console.log(validUser);
        if (validUser) return true;
        return false;
    }
}