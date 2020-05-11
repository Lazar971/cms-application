import React from 'react';
import { connect } from 'react-redux';
import { Grid } from 'semantic-ui-react';
import { loadPosts } from '../actions/PostActons';
import { Post } from '../model/model.type';
import { StateType } from '../model/store.type';
import PostCard from './PostCard';
import PostFilter from './PostFilter';

interface StoreProps {
    posts: Post[],
    categoryId: number,
    loadPosts: () => Promise<void>;
}

function ViewPosts(props: StoreProps) {
    React.useEffect(() => {
        console.log('pre');
        props.loadPosts();

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
        loadPosts: loadPosts(dispach)
    }
})(ViewPosts);
