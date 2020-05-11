import { combineReducers } from "redux";
import { postReducer } from './reducers/PostReducer'
import { postCategoryReducer, activeCategoryReducer } from "./reducers/PostCategoryReducer";
export default combineReducers({
    posts: postReducer,
    postCategories: postCategoryReducer,
    selectedCategoryId: activeCategoryReducer
});