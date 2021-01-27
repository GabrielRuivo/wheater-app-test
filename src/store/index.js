import { createStore } from 'redux';

const INITIAL_STATE = {
    data_search: [],
    data_current_location: []
}

function reducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'ADD_SEARCH_CITY_INFORMATION': 
            return {...state, data_search: [...state.data_search, action.payload]}
        case 'ADD_CURRENT_LOCATION': 
            return {...state, data_current_location: [...state.data_current_location, action.payload]}
        default: 
            return state;
    }
}

const store = createStore(reducer)

export default store;