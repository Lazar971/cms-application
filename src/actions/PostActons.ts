import { Post } from "../model/model.type";
import { Action, ActionType } from "../model/action.type";

export const addPost = (post: Post): Action => {
    return {
        type: ActionType.ADD_POST,
        post: post
    }
}