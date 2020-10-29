import { GET_USER,SET_USER } from "./actionNames";

export const logUser = user => ({
    type: SET_USER,
    payload: user
})

export const currentUser = user => ({
    type: GET_USER,
    payload: user
})

