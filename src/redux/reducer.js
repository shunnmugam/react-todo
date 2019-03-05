import {ADD_TODO, DELETE_TODO} from "./constants";

export default (state = {todos:[]}, action) => {
    switch (action.type) {
        case ADD_TODO:
            const todos = Object.assign([],state.todos);
            const stateObj = {...state};
            stateObj.todos = [...todos,action.payload];
            return stateObj;
        case DELETE_TODO:
            const index = action.payload;
            const todos1 = Object.assign([],state.todos);
            todos1.splice(0,1);
            const stateObj1 = {...state};

            stateObj1.todos = todos1;
            console.log(stateObj1);
            return stateObj1;
        default:
            return state;
    }
};