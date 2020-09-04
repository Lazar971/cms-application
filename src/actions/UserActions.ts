import Axios from "axios";
import { Dispatch } from "redux";
import { Action, ActionType } from "../model/action.type";
import { UnregisteredUser, User } from "../model/model.type";
export const loginUser = (dispach: Dispatch<Action>) => {

    return (username: string, password: string) => {


        return Axios.post('https://localhost:8443/user/login', {
            username: username,
            password: password
        }).then(value => {
            console.log(value.data);
            if (!value.data) {
                return Promise.resolve(false);
            }
            dispach(setUserAction(value.data));
        })
    }
}
export const setUserAction = (user?: User): Action => {

    return {
        type: ActionType.LOGIN,
        user: user
    }
}
export const chechUser = (dispach: Dispatch<Action>) => () => {

    return Axios.get('https://localhost:8443/user').then(value => {

        if (!value.data) {
            return;
        }

        dispach(setUserAction(value.data));
    })
}
export const logout = (dispach: Dispatch<Action>) => () => {
    return Axios.post('https://localhost:8443/user/logout').then(value => {
        if (value.data !== true) {
            alert(value.data);
        } else {

            dispach({ type: ActionType.LOGOUT });
        }
    })
}

export const registerUser = (dispach: Dispatch<Action>) => (user: UnregisteredUser) => {
    return Axios.post('https://localhost:8443/user/register', user).then(value => {
        let data = value.data;
        console.log(value.data);
        if (data.error) {
            return Promise.resolve({ error: data.error });
        } else {
            dispach(setUserAction(value.data));
        }
    })
}