import React from 'react';
import { Button, Form, Label } from 'semantic-ui-react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/UserActions';
import $ from 'jquery'
interface Props {
    login: (username: string, password: string) => Promise<any>;
}

function Login(props: Props & RouteComponentProps) {
    const [username, setUsername] = React.useState('');
    const [error, setError] = React.useState('');

    return (
        <Form size='big' method='post'>
            {error !== '' && <Label color='red' >{error}</Label>}
            <Form.Field>
                <label>Username</label>
                <input placeholder='Username' required onChange={(e) => {
                    setUsername(e.target.value);
                }} />
            </Form.Field>
            <Form.Field>
                <label>Password</label>
                <input type='password' className='password' autoComplete='false' name='pass' required />
            </Form.Field>

            <Button className='inverted' onClick={(e) => {
                e.preventDefault();
                const pass = $('input[name=pass]').val() as string;
                $('input[name=pass]').val('')
                props.login(username, pass).then(value => {

                    if (value === false) {

                        setError('greska');
                    } else {
                        props.history.push('/');
                    }
                })


            }}>Login</Button>
        </Form >
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
