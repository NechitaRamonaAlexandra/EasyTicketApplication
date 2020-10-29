import { GET_USER, SET_USER } from "../actions/actionNames"

const fetchUser = (state = {},action) => {
    if (action.type === GET_USER) {
        return action.payload;
    }
    else if (action.type === SET_USER) {
        state = action.payload;
        return state;
    }
    else {
        return state;
    }
}

export default fetchUser;