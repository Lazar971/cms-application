import { User, Post, PostCategory } from "./model.type";

export interface StateType {


    posts: Post[],
    postCategories: PostCategory[],
    selectedCategoryId: number
}