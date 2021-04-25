/**
 * Reducer for the user ID.
 * */


const initialState = { userID: 'me' };

function setCurrentUserID(state = initialState, action) {
    let nextState;
    switch (action.type) {
        case 'SET_USER_ID':
            console.log('[STORE] Change the User ID:', action.value);
            nextState = {userID: action.value};
            return nextState || state;
        default:
            return state;
    }
}

export default setCurrentUserID;
