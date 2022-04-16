import { mongoose } from 'mongoose';
import statusProduct  from '../config/statusProduct.js';

const postSchema = new mongoose.Schema({
    title:{
        type:String
    },
    description:{
        type:String
    },
    price:{
        type:Number
    },
    status:{
        type:Number,
        enume: Object.values(statusProduct)
    },
    statusPost:{
        type:Number,
        default:0
    },
    Image:[{
        data: Buffer,
        contentType: String
    }],
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account',
        require: true
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        require:true
    }
},{
    timestamps: true
});

export default mongoose.model('Post',postSchema,'Post');