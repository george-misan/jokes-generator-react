import {
    SET_LOADING, SET_RANDOM_JOKE, SET_CATEGORIZED_JOKE, SET_SAVED_JOKES,
  } from './constants';
  
  export const setJokeRandomAction = (randomJoke) => ({
    type: SET_RANDOM_JOKE,
    payload: {
      randomJoke,
    },
  });
  
  export const setLoadingAction = (loading) => ({
    type: SET_LOADING,
    payload: loading,
  });
  
  export const setCategorizedJokeAction = (categorizedJoke) => ({
    type: SET_CATEGORIZED_JOKE,
    payload: { categorizedJoke },
  });
  
  export const setSavedJokesAction = (savedJokes) => ({
    type: SET_SAVED_JOKES,
    payload: { savedJokes },
  });
  