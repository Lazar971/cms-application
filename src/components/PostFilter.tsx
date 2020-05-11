import React from 'react';
import { Menu } from 'semantic-ui-react';
import { PostCategory } from '../model/model.type';
import { connect } from 'react-redux';
import { StateType } from '../model/store.type';
import { fetchPostCategories, setActiveCategory } from '../actions/PostCategoryActions';

interface Props {
    categories: PostCategory[],
    onClick: (cat: PostCategory) => void
    addCat: (cat: PostCategory) => void
}
function PostFilter(props: Props) {

    React.useEffect(() => {
        [
            { id: 1, value: '1' },
            { id: 2, value: '2' },
            { id: 3, value: '3' },
            { id: 4, value: '4' },
        ].forEach(element => {
            props.addCat(element);
        })
    }, [])

    return (
        <Menu vertical fluid >
            {props.categories.map(element => {
                return (
                    <Menu.Item link key={element.id} onClick={(e) => {
                        props.onClick(element);
                    }}>
                        {element.value}
                    </Menu.Item>
                )
            })}
        </Menu>
    );
}
export default connect((state: StateType) => {
    return {
        categories: state.postCategories
    }
}, (dispach) => {
    return {
        onClick: (cat: PostCategory) => {
            dispach(setActiveCategory(cat))
        },
        addCat: (cat: PostCategory) => {
            dispach(fetchPostCategories(cat));
        }
    }
})(PostFilter)
