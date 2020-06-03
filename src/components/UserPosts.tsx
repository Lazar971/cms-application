import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { Button, Container, Header, Pagination, Table } from 'semantic-ui-react';
import { deletePost } from '../actions/PostActons';
import { Post, User } from '../model/model.type';
import { StateType } from '../model/store.type';

interface Props {
    user?: User,
    posts: Post[],
    onDelete: (id: number) => void
}

function UserPosts(props: Props) {
    const [page, setPage] = React.useState(1);

    if (!props.user) {
        return (
            <Redirect to='/login' />
        )
    }

    return (
        <Container fluid   >
            <Header as='h1'>Your posts</Header>
            <Table sortable >
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>No.</Table.HeaderCell>
                        <Table.HeaderCell>Title</Table.HeaderCell>
                        <Table.HeaderCell>No. of comments</Table.HeaderCell>
                        <Table.HeaderCell>Author</Table.HeaderCell>
                        <Table.HeaderCell>Details</Table.HeaderCell>
                        <Table.HeaderCell>Update</Table.HeaderCell>
                        <Table.HeaderCell>Delete</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {props.posts.slice((page - 1) * 5, 5 * page).map((element, index) => {
                        return (
                            <Table.Row key={element.id}>
                                <Table.Cell>{(page - 1) * 5 + index + 1}</Table.Cell>
                                <Table.Cell>{element.title}</Table.Cell>
                                <Table.Cell>{element.comments ? element.comments.length : 0}</Table.Cell>
                                <Table.Cell>{(element.author && element.author.id === props.user?.id) ? 'You' : (element.author?.username || 'not found')}</Table.Cell>
                                <Table.Cell >
                                    <Link to={`/post/${element.id}`}>Details</Link>
                                </Table.Cell>
                                <Table.Cell>
                                    <Link to='/'> Update</Link>
                                </Table.Cell>
                                <Table.Cell >
                                    <Button onClick={(e, data) => {
                                        console.log('delete')
                                        props.onDelete(element.id);
                                    }} color='red'>Delete</Button>
                                </Table.Cell>

                            </Table.Row>
                        )
                    })}
                </Table.Body>
            </Table>
            <Pagination activePage={page} onPageChange={(event, data) => {
                console.log(data);
                if (typeof data.activePage === 'string') {

                    setPage(parseInt(data.activePage))
                } else {
                    setPage(data.activePage || 1);
                }
            }} totalPages={Math.ceil(props.posts.length / 5)} />

        </Container>
    );
}
export default connect((state: StateType) => {
    return {
        user: state.user,
        posts: state.posts.filter(element => state.user && (state.user.category === 'admin' || (element.author && element.author.id === state.user.id)))
    }
}, (dispach) => {
    return {
        onDelete: deletePost(dispach)
    }
})(UserPosts);