import { mongoose } from 'mongoose';

mongoose.SavePostListSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account',
        require: true
    },
    listPost:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        require: true
    }]
});