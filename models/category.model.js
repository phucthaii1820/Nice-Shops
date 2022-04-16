import { mongoose } from 'mongoose';

const categorySchema = mongoose.Schema({
    name:String,
    categoryId:Number
});

export default mongoose.model('Category',categorySchema,'Category');