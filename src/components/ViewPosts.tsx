import React from 'react';
import { connect } from 'react-redux';
import { Grid, Card } from 'semantic-ui-react';
import { Post } from '../model/model.type';
import { StateType } from '../model/store.type';
import PostCard from './PostCard';
import PostFilter from './PostFilter';

interface StoreProps {
    posts: Post[],
    categoryId: number,
}

function ViewPosts(props: StoreProps) {

    return (
        <>
            <Grid.Column width='10'>
                <Card.Group centered >
                    {props.posts.filter(element => !props.categoryId || element.category.id === props.categoryId).map(element => {
                        return (
                            <PostCard post={element} key={element.id} />
                        )
                    })}

                </Card.Group>
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
})(ViewPosts);
