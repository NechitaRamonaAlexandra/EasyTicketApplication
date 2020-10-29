import { SET_ADMIN,GET_ADMIN } from "./actionNames";

export const logAdmin = admin => ({
    type: SET_ADMIN,
    payload: admin
});

export const currentAdmin = (admin) => ({
    type: GET_ADMIN,
    payload: admin
});

