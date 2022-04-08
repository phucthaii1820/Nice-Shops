import { mongoose } from 'mongoose';

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
        type:Number
    },
    statusPost:{
        type:Number
    },
    Image:[{
        type:String
    }],
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account',
        require: true
    },
    category:{
        type: String,
        require: true
    }
},{
    timestamps: true
});

module.exports = mongoose.model('Post',postSchema,'Post');