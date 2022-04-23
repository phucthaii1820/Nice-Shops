import Post from '../models/post.model.js';
import categoryService from "./category.service.js";

const getListPost = async () => {
    const listPost = await Post.find().populate("userId", "name address");
    return listPost;
}

export default {
    async changStatusPostById(_id, statusPost) {
        await Post.updateOne({ _id }, { $set: { statusPost } })
    },

    async getListPostByStatusNotImg( statusPost ) {
        const listPost = await Post.find({ statusPost }).select("-Image").populate("userId", "name address").lean();
        return listPost;
    },
    async getListPostNotImg() {
        const listPost = await Post.find().select("-Image").populate("userId", "name address");
        return listPost;
    },

    async deleteProductById(_id) {
        await Post.deleteOne({ _id })
    },

    async addNewPost(userId, detail, image) {
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
    async getListPostByStatus(status) {
        const listPost = await Post.find({ statusPost: status }).populate("userId", "address").lean();
        for (let i = 0; i < listPost.length; i++) {
            listPost[i].Image[0] = Buffer.from(listPost[i].Image[0].buffer).toString('base64');
        }
        return listPost;
    },
    async getListPostOfUserByStatus(id, status){
        const listPost = await Post.find({userId: id, statusPost: status }).lean();
        for (let i = 0; i < listPost.length; i++) {
            listPost[i].Image[0] = Buffer.from(listPost[i].Image[0].buffer).toString('base64');
        }
        return listPost;
    },
    async getPostById(idPost) {
        const post = await Post.findOne({ _id: idPost })
            .populate("userId")
            .populate("category", "categoryId")
            .lean();
        for (let i = 0; i < post.Image.length; i++) {
            post.Image[i] = Buffer.from(post.Image[i].buffer).toString('base64');
        }
        return post;
    },
    async getListPostByCategory(idCategory) {
        const postData = await Post.find(
            { category: idCategory,
              statusPost: 1,
            }
        ).populate('category', 'categoryId').lean();
        const data = postData.map(post => { return { ...post, Image: post.Image.map(data => data = Buffer.from(data.buffer).toString('base64')) } });
        return data;
    },
    async updatePost(detail, image) {
        const categoryId = await categoryService.getIdCategoryByBrandId(parseInt(detail.category));
        detail.price = Number(detail.price.split('.').join(''));
        if (image.length != 0) {
            await Post.findByIdAndUpdate(detail.id, {
                title: detail.title,
                description: detail.description,
                price: detail.price,
                address: detail.address,
                category: categoryId,
                status: detail.statusProduct,
                Image: image
            })
        }
        else{
            await Post.findByIdAndUpdate(detail.id, {
                title: detail.title,
                description: detail.description,
                price: detail.price,
                address: detail.address,
                category: categoryId,
                status: detail.statusProduct,
            })
        }
    },
    async updateStatus(id, status){
        await Post.findByIdAndUpdate(id, {statusPost: status});
    },
    getListPost
}
