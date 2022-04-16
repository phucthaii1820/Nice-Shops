import Category from '../models/category.model.js'

export default{
    async getIdCategoryByBrandId(id){
        const resultId = await Category.findOne({categoryId: id},{_id: 1}).lean();
        return resultId._id;
    }
}