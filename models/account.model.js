import { mongoose } from 'mongoose';
import { gender } from ('./config/gender');
import { role } from ('./config/role');

const accountSchema = new mongoose.Schema({
    phone:{
        type: String,
        require: true
    },
    password:{
        type:String,
        require: true
    },
    email:{
        type:String,
    },
    name:{
        type:String,
    },
    gender:{
        type: Number,
        enume: Object.values(gender),
    },
    address:{
        type:String,
    },
    cmnd:{
        type:String,
    },
    dob:{
        type: Date,
    },
    role:{
        type:Number,
        enume: Object.values(role)
    }
});

module.exports = mongoose.model('Account',accountSchema,'Account');