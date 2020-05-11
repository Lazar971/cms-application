import { Post } from "../model/model.type";
import { Action, ActionType } from "../model/action.type";

export const postReducer = (state: Post[] = [], action: Action = { type: ActionType.DEFAULT }): Post[] => {

    switch (action.type) {
        case ActionType.ADD_POST:

            return [...state, action.post];
        case ActionType.SET_POSTS:
            console.log('reducer')
            return action.posts;
        default:
            return state;
    }

}