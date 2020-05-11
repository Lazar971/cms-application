import React from 'react';
import { Grid } from 'semantic-ui-react';
import { Post, User, PostCategory } from '../model/model.type';
import PostCard from './PostCard';
import { connect } from 'react-redux';
import { StateType } from '../model/store.type';
import { addPost } from '../actions/PostActons';
import PostFilter from './PostFilter';

interface StoreProps {
    posts: Post[],
    addPost: (id: number, title: string, description: string, author: User, category: PostCategory) => void;
    categoryId: number
}

function ViewPosts(props: StoreProps) {
    React.useEffect(() => {
        props.addPost(1, 'Naslov1', 'asghasssssssssssssssssssssssssssssssssssaaaaaaaaaaaaaaaaaaaaassssssssssssss\nssssssssssssssssssssaaaaaaaaaaaaaaaaaaaaassssssssssssssssssssssssssssssssssaaaaaaaaaaaaaaaaaaaaassssssssssssssssss\nssssssssssssssssaaaaaaaaaaaaaaaaaaaaadsssznsssssssssssssssssssssssssssssssssssssssssssssssssaaaaaaaaaaaaaaaaaaaaaaaassssssssssssssssss\nssssssssssssssssssssssssssssssssssssssssssssssssssdjk', { id: 1, lastName: 'afgr', firstName: 'afesgr', age: 3, category: 'admin' }, { id: 1, value: 'c1' });
        props.addPost(1, 'Naslov1', 'asghasssssssssssssssssssssssssssssssssssaaaaaaaaaaaaaaaaaaaaassssssssssssss\nssssssssssssssssssssaaaaaaaaaaaaaaaaaaaaassssssssssssssssssssssssssssssssssaaaaaaaaaaaaaaaaaaaaassssssssssssssssss\nssssssssssssssssaaaaaaaaaaaaaaaaaaaaadsssznsssssssssssssssssssssssssssssssssssssssssssssssssaaaaaaaaaaaaaaaaaaaaaaaassssssssssssssssss\nssssssssssssssssssssssssssssssssssssssssssssssssssdjk', { id: 1, lastName: 'afgr', firstName: 'afesgr', age: 3, category: 'admin' }, { id: 1, value: 'c1' });
        props.addPost(1, 'Naslov1', 'asghasssssssssssssssssssssssssssssssssssaaaaaaaaaaaaaaaaaaaaassssssssssssss\nssssssssssssssssssssaaaaaaaaaaaaaaaaaaaaassssssssssssssssssssssssssssssssssaaaaaaaaaaaaaaaaaaaaassssssssssssssssss\nssssssssssssssssaaaaaaaaaaaaaaaaaaaaadsssznsssssssssssssssssssssssssssssssssssssssssssssssssaaaaaaaaaaaaaaaaaaaaaaaassssssssssssssssss\nssssssssssssssssssssssssssssssssssssssssssssssssssdjk', { id: 1, lastName: 'afgr', firstName: 'afesgr', age: 3, category: 'admin' }, { id: 1, value: 'c1' });
        props.addPost(1, 'Naslov1', 'asghasssssssssssssssssssssssssssssssssssaaaaaaaaaaaaaaaaaaaaassssssssssssss\nssssssssssssssssssssaaaaaaaaaaaaaaaaaaaaassssssssssssssssssssssssssssssssssaaaaaaaaaaaaaaaaaaaaassssssssssssssssss\nssssssssssssssssaaaaaaaaaaaaaaaaaaaaadsssznsssssssssssssssssssssssssssssssssssssssssssssssssaaaaaaaaaaaaaaaaaaaaaaaassssssssssssssssss\nssssssssssssssssssssssssssssssssssssssssssssssssssdjk', { id: 1, lastName: 'afgr', firstName: 'afesgr', age: 3, category: 'admin' }, { id: 1, value: 'c1' });
        props.addPost(1, 'Naslov1', 'asghasssssssssssssssssssssssssssssssssssaaaaaaaaaaaaaaaaaaaaassssssssssssss\nssssssssssssssssssssaaaaaaaaaaaaaaaaaaaaassssssssssssssssssssssssssssssssssaaaaaaaaaaaaaaaaaaaaassssssssssssssssss\nssssssssssssssssaaaaaaaaaaaaaaaaaaaaadsssznsssssssssssssssssssssssssssssssssssssssssssssssssaaaaaaaaaaaaaaaaaaaaaaaassssssssssssssssss\nssssssssssssssssssssssssssssssssssssssssssssssssssdjk', { id: 1, lastName: 'afgr', firstName: 'afesgr', age: 3, category: 'admin' }, { id: 1, value: 'c1' });
        props.addPost(1, 'Naslov1', 'asghasssssssssssssssssssssssssssssssssssaaaaaaaaaaaaaaaaaaaaassssssssssssss\nssssssssssssssssssssaaaaaaaaaaaaaaaaaaaaassssssssssssssssssssssssssssssssssaaaaaaaaaaaaaaaaaaaaassssssssssssssssss\nssssssssssssssssaaaaaaaaaaaaaaaaaaaaadsssznsssssssssssssssssssssssssssssssssssssssssssssssssaaaaaaaaaaaaaaaaaaaaaaaassssssssssssssssss\nssssssssssssssssssssssssssssssssssssssssssssssssssdjk', { id: 1, lastName: 'afgr', firstName: 'afesgr', age: 3, category: 'admin' }, { id: 1, value: 'c1' });
    }, [])
    return (
        <>
            <Grid.Column className='scrolling' width='10'>
                {props.posts.filter(element => !props.categoryId || element.category.id === props.categoryId).map(element => {
                    return (
                        <PostCard post={element} key={element.id} />
                    )
                })}
            </Grid.Column >
            <Grid.Column verticalAlign='top' width='5' >
                <PostFilter />
            </Grid.Column>
        </>
    );
}

export default connect((state: StateType) => {
    return {
        posts: state.posts,
        categoryId: state.selectedCategoryId
    }
}, (dispach) => {
    return {
        addPost: (id: number, title: string, description: string, author: User, category: PostCategory) => {
            dispach(addPost({ id: id, title: title, description: description, author: author, category: category }))
        }
    }
})(ViewPosts);
