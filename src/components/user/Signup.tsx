import React from 'react'
import { connect } from 'react-redux'
import { Form, Label, Button } from 'semantic-ui-react';
interface Props {

}
function Signup(props: Props) {
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
            <Form.Field>
                <label>Repeat password</label>
                <input type='password' onChange={(e) => {
                    setPassword(e.target.value);
                }} />
            </Form.Field>
            <Form.Field>
                <label>First name</label>
                <input type="text" />
            </Form.Field>
            <Form.Field>
                <label>Last name</label>
                <input type="text" />
            </Form.Field>
            <Form.Field>
                <label>Age</label>
                <input type="number" />
            </Form.Field>
            <Button className='inverted'>
                Sign up
            </Button>
        </Form>
    )
}
export default connect()(Signup);