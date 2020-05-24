import React from 'react';
import { Container, Header, Comment, Form, Button, Label, Grid, Segment } from 'semantic-ui-react';
import { Post, User } from '../model/model.type';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { StateType } from '../model/store.type';
import PostComment from './PostComment';

interface Props {
    post: Post,
    user?: User
}
function PostDetails(props: Props & RouteComponentProps) {
    const [showComments, setShowComments] = React.useState(true);
    if (!props.post) {
        return (<>Loading</>)
    }
    const printAuthor = () => {
        if (!props.post.author) {
            return 'User no longer exists';
        }
        if (props.post.author.id === props.user?.id) {
            return 'you';
        }
        return props.post.author.firstName + ' ' + props.post.author.lastName;
    }
    return (
        <Grid className='postDetails' centered >
            <Grid.Row >
                <Grid.Column >
                    <Header size='huge' textAlign='center'>
                        <Header.Content>
                            {props.post.title}
                        </Header.Content>
                        <Header.Subheader >
                            Author: {printAuthor()}
                        </Header.Subheader>
                        <Header.Subheader>
                            Category: {props.post.category.value}
                        </Header.Subheader>
                    </Header>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row stretched >
                <Grid.Column stretched >
                    <Segment basic attached='top' size='large'>
                        <p>{props.post.description}</p>
                    </Segment>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row >
                <Grid.Column >
                    <Segment inverted onClick={() => setShowComments(prev => !prev)} >{(showComments) ? 'Hide ' : 'Show '}comments</Segment>
                    <Comment.Group className='center' collapsed={!showComments}>
                        {props.post.comments.map(element => {
                            return (
                                <PostComment comment={element} />
                            )
                        })}
                        {props.user && <Form>
                            <Form.TextArea placeholder='Add comment...' />
                            <Button content='Add Comment' labelPosition='left' icon='edit' primary />
                        </Form>}
                    </Comment.Group>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    );
}
export default withRouter(connect((state: StateType, ownProps: RouteComponentProps) => {
    return {
        post: state.posts.find(element => {
            const id = (ownProps.match.params as any).id;
            console.log({ ownProps: ownProps, equals: id == element.id });
            return id == element.id
        }) as Post,
        user: state.user
    }
})(PostDetails));