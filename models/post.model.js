import { mongoose } from 'mongoose';
import statusPost from '../config/statusPost.js';
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
        enum: Object.values(statusPost),
        default: statusPost.pending_review
    },
    Image:[Buffer],
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account',
        require: true
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        require:true
    },
    address:String
},{
    timestamps: true
});

export default mongoose.model('Post',postSchema,'Post');