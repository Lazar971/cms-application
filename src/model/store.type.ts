import { User, Post, PostCategory } from "./model.type";

export interface StateType {

    user: User,
    posts: Post[],
    postCategories: PostCategory[],
    selectedCategoryId: number,
    //tags: Tag[],
    //selectedTags: Tag[],
    title: string
}