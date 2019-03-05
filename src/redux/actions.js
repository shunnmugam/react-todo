import {ADD_TODO, DELETE_TODO} from "./constants";

export const addTodo = data => ({
    type : ADD_TODO,
    payload : data
});

export const deleteTodo = data => ({
    type : DELETE_TODO,
    payload : data
});
