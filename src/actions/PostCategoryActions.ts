import { Action, ActionType } from "../model/action.type"
import { PostCategory } from "../model/model.type"

export const fetchPostCategories = (cat: PostCategory): Action => {
    return {
        type: ActionType.FETCH_POST_CATEGORIES,
        categories: cat
    }
}
export const setActiveCategory = (cat: PostCategory): Action => {
    return {
        type: ActionType.SET_ACTIVE_CATEGORY,
        category: cat.id
    }
}