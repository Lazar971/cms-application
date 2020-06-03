import { Dispatch } from "redux";
import { Action, ActionType } from "../model/action.type";
import Axios from "axios";
import { User } from "../model/model.type";
import * as querystring from 'querystring'
export const loginUser = (dispach: Dispatch<Action>) => {

    return (username: string, password: string) => {
        let str = querystring.stringify({
            action: 'login',
            username: username,
            password: password
        });
        console.log(str);
        return Axios.post('http://localhost:5000/user', str
            , {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
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

    return Axios.post('http://localhost:5000/user', { action: 'check' }).then(value => {

        if (!value.data) {
            return;
        }

        dispach(setUserAction(value.data));
    })
}
export const logout = (dispach: Dispatch<Action>) => () => {
    return Axios.post('http://localhost:5000/user', { action: 'logout' }).then(value => {
        if (value.data !== true) {
            alert(value.data);
        } else {
            dispach({ type: ActionType.LOGOUT });
        }
    })
}