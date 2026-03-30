import * as api from '../api';

export const signin = (formData) => async(dispatch) => {
    try {
        const {data} = await api.signin(formData);
        // console.log(data);
        dispatch({type: "SIGNIN" , payload: data})
        window.location.replace('/');
    } catch (error) {
        console.log(error)
    }
}

export const signup = (formData) => async(dispatch) => {
    try {
        const {data} = await api.signup(formData);
        // console.log(data);
        dispatch({type: "SIGNUP" , payload: data})
        window.location.replace('/');
    } catch (error) {
        console.log(error);
    }
}