import React from 'react';
import { Menu } from 'semantic-ui-react';
import { PostCategory } from '../model/model.type';
import { connect } from 'react-redux';
import { StateType } from '../model/store.type';
import { fetchPostCategories, setActiveCategory, loadCategories } from '../actions/PostCategoryActions';

interface Props {
    categories: PostCategory[],
    onClick: (cat: PostCategory) => void
    loadCat: () => Promise<void>
}
function PostFilter(props: Props) {

    React.useEffect(() => {
        props.loadCat();
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
        loadCat: loadCategories(dispach)
    }
})(PostFilter)
