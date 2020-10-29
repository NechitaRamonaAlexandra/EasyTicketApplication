import { GET_ADMIN, SET_ADMIN } from "../actions/actionNames";

const fetchAdmin = (state = {}, action) => {
    if (action.type === GET_ADMIN) {
        console.log("here");
        console.log(action.payload);
        return action.payload;
    }
    else if (action.type === SET_ADMIN) {
        return action.payload;
    }
    else {
        return state;
    }
};

export default fetchAdmin;