import React from 'react';
import { Container, Header, Form, TextArea, Button, DropdownItemProps, Dropdown } from 'semantic-ui-react';
import { User, PostCategory } from '../../model/model.type';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { StateType } from '../../model/store.type';
import { addPost } from '../../actions/PostActons';
interface Props {
    user?: User,
    categories: PostCategory[],
    onClick: (title: string, desc: string, cat: PostCategory) => Promise<void>,
}
function NewPost(props: Props) {
    const [title, setTitle] = React.useState('');
    const [desc, setDesc] = React.useState('');
    const [cat, setCat] = React.useState<PostCategory | undefined>(undefined);
    if (!props.user) {
        return (
            <Redirect to='/login' />
        )
    }

    return (
        <Container fluid >
            <Header as='h2'>Add new post</Header>
            <Form size='big'>
                <Form.Input className='postTitle' labelPosition='left corner' value={title} onChange={(e, data) => {
                    setTitle(e.currentTarget.value);
                }} label='Title' />
                <TextArea placeholder='Content...' value={desc} onChange={(e, data) => {
                    setDesc(e.currentTarget.value);
                }} />
                <Dropdown selection value={cat && cat.id} fluid placeholder='category' options={props.categories.map((element, index): DropdownItemProps => {
                    return {
                        key: element.id,
                        text: element.value,
                        active: element === cat,
                        selected: element === cat,
                        value: element.id
                    }
                })} onChange={(e, data) => {
                    setCat(props.categories.find(element => element.id === data.value));
                }} />
                <Button disabled={!cat || title === ''} className='inverted' onClick={() => {
                    console.log('kliknuto');
                    if (!cat) {
                        alert('Please insert the category')
                        return;
                    }
                    props.onClick(title, desc, cat);
                }}>Add post</Button>
            </Form>
        </Container>
    );
}
export default connect((state: StateType) => {
    return {
        user: state.user,
        categories: state.postCategories
    }
}, dispach => {
    return {
        onClick: addPost(dispach)
    }
})(NewPost);