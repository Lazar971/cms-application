export interface User {
    id: number,
    firstName: string,
    lastName: string,
    age: number,
    category: 'reqular' | 'admin'
}
export interface PostCategory {
    id: number,
    value: string,
}
export interface Post {
    id: number,
    title: string,
    description: string,
    author: User,
    category: PostCategory,
    comments: Comment[]
}
export interface Comment {
    id: number,
    content: string,
    user: User,
    post: Post
}