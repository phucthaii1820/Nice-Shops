import Post from "../models/post.model.js";
import fs from "fs"
export default {
    async addNewPost(userId,detail,image){
        const post = await Post.create({
            title: detail.title,
            description: detail.description,
            price: detail.price,
            address: detail.address,
            category: detail.category,
            status: detail.status,
            Image: image,
            userId: userId
        });
    }
}