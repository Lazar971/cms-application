import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import { Container, Header, Pagination, Table, Button, Form, Input, TextArea } from 'semantic-ui-react';
import { User, Post } from '../model/model.type';
import Axios from 'axios';
import { connect } from 'react-redux';
import { StateType } from '../model/store.type';

interface Props {
    user?: User,
    posts: Post[]
}

function UserPosts(props: Props) {
    const [page, setPage] = React.useState(1);

    if (!props.user) {
        return (
            <Redirect to='/login' />
        )
    }

    return (
        <Container fluid  >
            <Header as='h1'>Your posts</Header>
            <Table >
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>No.</Table.HeaderCell>
                        <Table.HeaderCell>Title</Table.HeaderCell>
                        <Table.HeaderCell>No. of comments</Table.HeaderCell>
                        <Table.HeaderCell>Details</Table.HeaderCell>
                        <Table.HeaderCell>Update</Table.HeaderCell>
                        <Table.HeaderCell>Delete</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {props.posts.slice((page - 1) * 10, 10 * page).map((element, index) => {
                        return (
                            <Table.Row key={element.id}>
                                <Table.Cell>{(page - 1) * 10 + index + 1}</Table.Cell>
                                <Table.Cell>{element.title}</Table.Cell>
                                <Table.Cell>{element.comments.length}</Table.Cell>
                                <Table.Cell >
                                    <Link to={`/post/${element.id}`}>Details</Link>
                                </Table.Cell>
                                <Table.Cell>
                                    <Link to='/'> Update</Link>
                                </Table.Cell>
                                <Table.Cell >
                                    <Button color='red'>Delete</Button>
                                </Table.Cell>

                            </Table.Row>
                        )
                    })}
                </Table.Body>
            </Table>
            <Pagination activePage={page} onPageChange={(event, data) => {
                if (typeof data.activePage === 'string') {
                    setPage(parseInt(data.activePage))
                } else {
                    setPage(data.activePage || 1);
                }
            }} totalPages={props.posts.length / 10} />

        </Container>
    );
}
export default connect((state: StateType) => {
    return {
        user: state.user,
        posts: state.posts.filter(element => state.user && (state.user.category === 'admin' || element.author && element.author.id === state.user.id))
    }
})(UserPosts);