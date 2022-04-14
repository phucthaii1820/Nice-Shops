import Post from '../models/post.model.js';

export const getListPostByCategory = async (idCategory) => {
    const postData = await Post.find(
        {category: idCategory}
    )
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
