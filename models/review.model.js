import { mongoose } from 'mongoose';

const reviewShcema = mongoose.Schema({
    fromUserId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account',
        require: true
    },
    toUserId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account',
        require: true
    },
    star:{
        type:Number,
    },
    comment:{
        type:String
    }
});

module.exports = mongoose.model('Review',reviewShcema,'Review');