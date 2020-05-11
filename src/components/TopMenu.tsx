import React from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export default function TopMenu() {
    return (
        <Menu className='topMenu' borderless stackable fluid attached='top'   >
            <Menu.Item
                icon='bar'
                as={Link}
                to='/'
            />
            <Menu.Item as={Link} to='/post' link >
                Posts
            </Menu.Item>
            <Menu.Item as={Link} to='/admin' link>
                Admin
            </Menu.Item>
            <Menu.Menu position='right'>
                <Menu.Item as={Link} to='/login'>
                    Login
                </Menu.Item>
                <Menu.Item as={Link} to='/signup'>
                    Sign up
                </Menu.Item>
            </Menu.Menu>
        </Menu>
    );
}
