export enum ActionType {
    LOGIN = 'login',
    SIGN_UP = 'signup',
    FETCH_POSTS = 'fp',
    ADD_POST = 'ap',
    DEFAULT = 'def',
    FETCH_POST_CATEGORIES = 'fpc',
    SET_ACTIVE_CATEGORY = 'ac'

}

export interface Action {
    type: ActionType,
    [key: string]: any
}