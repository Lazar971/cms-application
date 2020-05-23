import { Post, PostCategory } from "../model/model.type";
import { Action, ActionType } from "../model/action.type";
import { Dispatch } from "redux";
import axios from 'axios'
axios.defaults.withCredentials=true;
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
            let posts = value.data as Post[];
            Promise.all(posts.map(element => {
                return axios.get(`http://localhost:5000/post/${element.id}/comments`).then(result => {


                    element.comments = result.data;
                })
            })).then(value => {
                dispach(setPosts(posts));
            })

        })
    }
}
export const addPost=(dispach: Dispatch<Action>)=>(title:string,desc:string,cat:PostCategory)=>{
    console.log('kliknuto');
    return axios.post('http://localhost:5000/post',{title:title,description:desc,category:cat},{
        withCredentials:true,
        
        
    }).then(value=>{
        
        let data=value.data;
        if(data.error){
            console.log({error:data});
            return;
        }
        dispach({
            type:ActionType.ADD_POST,
            post:data
        })
    })
}