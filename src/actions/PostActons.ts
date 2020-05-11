import { Post } from "../model/model.type";
import { Action, ActionType } from "../model/action.type";
import { Dispatch } from "redux";
import axios from 'axios'
export const addPost = (post: Post): Action => {
    return {
        type: ActionType.ADD_POST,
        post: post
    }
}
export const setPosts = (posts: Post[]): Action => {
    console.log(posts);
    return {
        type: ActionType.SET_POSTS,
        posts: posts
    }
}
export const loadPosts = (dispach: Dispatch<Action>) => {
    return () => {
        return axios.get('http://localhost:5000/post').then(value => {
            dispach(setPosts(value.data));
        })
    }
}