import { Post } from "../model/model.type";
import { Action, ActionType } from "../model/action.type";

export const postReducer = (state: Post[] = [], action: Action = { type: ActionType.DEFAULT }): Post[] => {

    switch (action.type) {
        case ActionType.ADD_POST:

            return [...state, action.post];
        case ActionType.SET_POSTS:
            
            return action.posts;
        case ActionType.DELETE_POST:
            return state.filter(element=>element.id!==action.id);
        default:
            return state;
    }

}