import { combineReducers } from 'redux'
import * as api from '../utils/api'

// ------------------------------------
// Constants
// ------------------------------------
export const FETCH_PEOPLE = 'FETCH_PEOPLE'
export const ADD_PERSON = 'ADD_PERSON'
export const REMOVE_ALL = 'REMOVE_ALL'
export const REMOVE_BY_ID = 'REMOVE_BY_ID'
// ------------------------------------
// Actions
// ------------------------------------
export const fetchPeople = () => {
  return (dispatch, getState) => {
    api.fetchPeople().then(res => {
      const people = res.data;
      dispatch(fetchData(people));
    });
  }
}

export const addPerson = (name, callback) => {
  return (dispatch) => {
    api.addPerson(name).then(res => {
      console.log('add person result', res);
      if (res.data.result) {
        const person = res.data.data;
        dispatch(personAdd([person]));
        callback();
      } else {
        alert(res.data.error);
      }
    })
  }
}

export const removeAll = () => {
  return (dispatch) => {
    console.log('removeAll');
    api.removeAll().then(res => {
      if (res) {
        dispatch(allRemove())
      }
    })
  }
}

export const removeById = (id) => {
  console.log('id', id);
  return (dispatch) => {
    console.log('removeByID');
    api.removeById(id).then(res => {
      console.log('removeByID res', res);
      if (res) {
        dispatch(byIdRemove(id))
      }
    })
  }
}


function fetchData(data) {
  return {
    type: FETCH_PEOPLE,
    data: data
  }
}

function personAdd(data) {
  return {
    type: ADD_PERSON,
    data: data
  }
}

function allRemove() {
  return {
    type: REMOVE_ALL
  }
}

function byIdRemove(id) {
  return {
    type: REMOVE_BY_ID,
    id: id
  }
}

export const actions = {

}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = [];

function people (state = initialState, action) {
  switch (action.type) {
    case FETCH_PEOPLE:
      return [...action.data]
    case ADD_PERSON:
      return [...state, ...action.data]
    case REMOVE_ALL:
      return initialState;
    case REMOVE_BY_ID:
      return [...state.filter((person) => {
        return person._id !== action.id
      })]
    default:
      return state
  }
}

const lunchReducer = combineReducers({
  people
})

export const getPeople = state => state.lunch.people

export default lunchReducer
