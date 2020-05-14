import React from 'react';
import { Menu, Label, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { User } from '../model/model.type';
import { connect } from 'react-redux';
import { StateType } from '../model/store.type';
import Weather from './Weather';
interface Props {
    user?: User
}
function TopMenu(props: Props) {
    return (
        <Menu className='topMenu' borderless stackable fluid attached='top'   >
            <Weather />
            <Menu.Item

                as={Link}
                to='/'
            >Home</Menu.Item>
            {props.user && (
                <>
                    <Menu.Item as={Link} to='/post'  >
                        Posts
            </Menu.Item>
                    <Menu.Item as={Link} to='/newPost'  >
                        New post
            </Menu.Item>
                    {props.user.category === 'admin' && <Menu.Item as={Link} to='/admin' >
                        Admin
            </Menu.Item>}
                </>)}

            <Menu.Menu position='right'>
                {!props.user ? (
                    <>
                        <Menu.Item  >
                            <Button as={Link} color='teal' to='/login'>Login</Button>
                        </Menu.Item>
                        <Menu.Item  >
                            <Button as={Link} color='teal' to='/signup'>Sign up</Button>
                        </Menu.Item>
                    </>) : (
                        <Menu.Item>
                            <Button as={Link} color='teal' to='/'>Logout</Button>
                        </Menu.Item>
                    )}
            </Menu.Menu>
        </Menu>
    );
}
export default connect((state: StateType) => {
    return {
        user: state.user
    }
})(TopMenu);