import {
    SET_RANDOM_JOKE, SET_CATEGORIZED_JOKE, SET_LOADING, SET_SAVED_JOKES,
  } from './constants';
  
  const initialState = {
    categorizedJoke: {
      value: 'Be ready to laugh your ass out...',
    },
    randomJoke: {
      value: 'Be ready to laugh your ass out...',
    },
    savedJokes: [],
    loading: false,
  };
  
  export default (state = initialState, { type, payload }) => {
    switch (type) {
    case SET_RANDOM_JOKE:
    case SET_CATEGORIZED_JOKE: {
      return {
        ...state,
        ...payload,
        loading: false,
      };
    }
    case SET_SAVED_JOKES: {
      return { ...state, ...payload };
    }
    case SET_LOADING: {
      return { ...state, loading: payload };
    }
    default:
      return state;
    }
  };
  