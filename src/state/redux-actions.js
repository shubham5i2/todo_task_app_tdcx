const redux = require('redux');

const createStore = redux.createStore;

const ADD_NEW_TASK = 'ADD_NEW_TASK'

function addNewTask(){
    return {
        type: ADD_NEW_TASK,
    }
}

const taskInitialState = {
    noOfTasks: 0
}

const addNewTaskReducer = (state = taskInitialState,action) => {
    switch(action.type){
        case ADD_NEW_TASK: return {...state,noOfTasks: state.noOfTasks + 1};
        default: return {...state};
    }
}

const store = createStore(addNewTaskReducer);
console.log('Initial state',store.getState());
store.dispatch(addNewTask());
store.dispatch(addNewTask());
store.dispatch(addNewTask());
console.log('After three calls',store.getState());