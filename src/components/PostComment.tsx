import React from 'react';
import { Comment as ModelComment } from '../model/model.type';
import { Comment, Segment } from 'semantic-ui-react';

interface Props {
    comment: ModelComment
}
export default function PostComment(props: Props) {
    return (
        <Segment>
            <Comment>
                <Comment.Content>
                    <Comment.Author >{(props.comment.user) ? (props.comment.user.firstName + " " + props.comment.user.lastName) : 'user is not found'}</Comment.Author>

                    <Comment.Text>
                        <p>{props.comment.content}</p>
                    </Comment.Text>

                </Comment.Content>
            </Comment>
        </Segment>
    );
}
