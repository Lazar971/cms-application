import { Dispatch } from "redux";
import { Action, ActionType } from "../model/action.type";
import Axios from "axios";
import { User } from "../model/model.type";

export const loginUser = (dispach: Dispatch<Action>) => {
    return (username: string, password: string) => {
        console.log(username, password);
        return Axios.post('http://localhost:5000/user', {
            action: 'login',
            username: username,
            password: password
        }).then(value => {
            console.log("Login: " + value.data);
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