import React from 'react';
import { Button, Form, Label } from 'semantic-ui-react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/UserActions';
interface Props {
    login: (username: string, password: string) => Promise<any>;
}

function Login(props: Props & RouteComponentProps) {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [error, setError] = React.useState('');

    return (
        <Form size='big'>
            {error !== '' && <Label color='red' >{error}</Label>}
            <Form.Field>
                <label>Username</label>
                <input placeholder='Username' onChange={(e) => {
                    setUsername(e.target.value);
                }} />
            </Form.Field>
            <Form.Field>
                <label>Password</label>
                <input type='password' onChange={(e) => {
                    setPassword(e.target.value);
                }} />
            </Form.Field>

            <Button color='purple' onClick={(e) => {
                e.preventDefault();
                props.login(username, password).then(value => {

                    if (value === false) {

                        setError('greska');
                    } else {
                        props.history.push('/');
                    }
                })

            }}>Login</Button>
        </Form>
    );
}
export default withRouter(connect(state => {
    return {

    }
}, (dispach) => {
    return {
        login: loginUser(dispach)
    }
})(Login))
