import { mongoose } from 'mongoose';
import gender from '../config/gender.js';
import role from '../config/role.js';
import jwt from 'jsonwebtoken';

const accountSchema = new mongoose.Schema({
    phone:{
        type: String,
        require: true,
        unique: true
    },
    password:{
        type:String,
        require: true
    },
    email:{
        type:String,
        default:""
    },
    name:{
        type:String,
        default: ""
    },
    gender:{
        type: Number,
        enume: Object.values(gender),
        default: gender.Undefine
    },
    address:{
        type:String,
        default: ""
    },
    cmnd:{
        type:String,
        default: ""
    },
    dob:Date,
    role:{
        type:Number,
        enume: Object.values(role),
        default: role.User
    },
    postmark:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        require:true,
    }]
});

export default mongoose.model('Account',accountSchema,'Account');