import React from 'react';
import { Container, Header, Form, TextArea, Button } from 'semantic-ui-react';
import { User } from '../../model/model.type';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { StateType } from '../../model/store.type';
interface Props {
    user?: User
}
function NewPost(props: Props) {
    if (!props.user) {
        return (
            <Redirect to='/login' />
        )
    }
    return (
        <Container fluid >
            <Header as='h2'>Add new post</Header>
            <Form size='big'>
                <Form.Input className='postDetails' labelPosition='left corner' label='Title' />
                <TextArea placeholder='Content...' />
                <Button className='inverted'>Add post</Button>
            </Form>
        </Container>
    );
}
export default connect((state: StateType) => {
    return {
        user: state.user
    }
})(NewPost);