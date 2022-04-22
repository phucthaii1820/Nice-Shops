import Post from '../models/post.model.js';
import categoryService from "./category.service.js";

export const getListPostByCategory = async (idCategory) => {
    const postData = await Post.find(
        {category: idCategory}
    )
    for(let i = 0; i < postData.length; i++){
        postData[i].Image[0].data = Buffer.from(postData[i].Image[0].data).toString('base64');
    }
    return postData;
}

export const getPostById = async (idPost) => {
    const post = await Post.find(
        { _id: idPost }
    )
    return post[0];
}

export const getListPost = async () => {
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
        const post = await Post.create({
            title: detail.title,
            description: detail.description,
            price: detail.price,
            address: detail.address,
            category: categoryId,
            status: detail.status,
            Image: image,
            userId: userId
        });
    }
}
