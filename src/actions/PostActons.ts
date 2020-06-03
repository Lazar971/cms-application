import { Post, PostCategory, Comment } from "../model/model.type";
import { Action, ActionType } from "../model/action.type";
import { Dispatch } from "redux";
import axios from 'axios'
axios.defaults.withCredentials = true;
export const setPosts = (posts: Post[]): Action => {
    return {
        type: ActionType.SET_POSTS,
        posts: posts
    }
}
export const loadPosts = (dispach: Dispatch<Action>) => {
    return () => {
        return axios.get('http://localhost:5000/post').then(value => {
            let posts = value.data as Post[];
            Promise.all(posts.map(element => {
                return axios.get(`http://localhost:5000/post/${element.id}/comments`).then(result => {

                    console.log(result.data);
                    element.comments = result.data;
                })
            })).then(value => {
                dispach(setPosts(posts));
            })

        })
    }
}
export const addPost = (dispach: Dispatch<Action>) => (title: string, desc: string, cat: PostCategory) => {
    return axios.post('http://localhost:5000/post', { title: title, description: desc, category: cat }, {
        withCredentials: true,


    }).then(value => {

        let data = value.data;
        if (data.error) {

            return;
        }
        dispach({
            type: ActionType.ADD_POST,
            post: data
        })
    }).then(value => {
        alert('Successfully created post');
    }).catch(err => {
        alert(err);
    })
}
export const deletePost = (dispach: Dispatch<Action>) => (id: number) => {

    return axios.delete('http://localhost:5000/post/' + id).then(value => {

        if (!value.data.status) {
            alert('unknown error');
        }
        alert(value.data.status);
        if (value.data.status === 'success') {
            dispach({
                type: ActionType.DELETE_POST,
                id: id
            })
        }
    })
}
export const addComment = (dispach: Dispatch<Action>) => (content: string, post: Post) => {
    return axios.post(`http://localhost:5000/post/${post.id}/comments`, { content: content }).then(value => {
        console.log('laza');
        console.log(value);
        const data = value.data;
        console.log(value.data);
        dispach({
            type: ActionType.ADD_COMMENT,
            comment: data
        })
    })
}
export const deleteComment = (dispach: Dispatch<Action>) => (comment: Comment) => {
    console.log('pre axiosa')
    return axios.delete(`http://localhost:5000/post/${comment.post.id}/comments/${comment.id}`).then(value => {
        console.log('laza');
        console.log(value);
        if (value.data.status === 'deleted') {
            dispach({
                type: ActionType.DELETE_COMMENT,
                comment: comment
            })
        }

    })
}