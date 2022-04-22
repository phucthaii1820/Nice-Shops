import Post from '../models/post.model.js';
import categoryService from "./category.service.js";

const getListPost = async () => {
    const listPost = await Post.find().populate("userId", "name address");
    return listPost;
}

export default {
    async getListPostNotImg (){
        const listPost = await Post.find().select ("-Image").populate("userId", "name address");
        return listPost;
    },

    async deleteProductById(_id) {
        await Post.deleteOne( { _id } )
    },

    async addNewPost(userId,detail,image){
        const categoryId = await categoryService.getIdCategoryByBrandId(parseInt(detail.category));
        console.log(detail.status);
        const post = await Post.create({
            title: detail.title,
            description: detail.description,
            price: detail.price,
            address: detail.address,
            category: categoryId,
            status: detail.statusProduct,
            Image: image,
            userId: userId
        });
    },
    async getListPostByStatus(status){
        const listPost = await Post.find({statusPost: status}).lean();
        for(let i = 0; i < listPost.length; i++){
            listPost[i].Image[0] = Buffer.from(listPost[i].Image[0].buffer).toString('base64');
        }
        return listPost;
    },
    async getPostById(action,idPost){
        let post = null;
        if (action == "detail")
            post = await Post.findOne({ _id: idPost }).populate("userId").lean();
        else 
            post = await Post.findOne({ _id: idPost }).populate("category", "categoryId").lean();
        for(let i = 0; i < post.Image.length; i++){
            post.Image[i] = Buffer.from(post.Image[i].buffer).toString('base64');
        }
        return post;
    },
    async getListPostByCategory(idCategory){
        const postData = await Post.find(
            {category: idCategory}
        ).populate('category', 'categoryId').lean();
        const data = postData.map(post => {return {...post, Image: post.Image.map(data => data = Buffer.from(data.buffer).toString('base64'))}});
        return data;
    },
    getListPost
}
