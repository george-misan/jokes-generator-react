const initialState = {
    joke: {}
}

export default (state = initialState, { type, payload }) => {
    switch (type) {

    case 'SET_JOKE':
        return { ...state, ...payload }

    default:
        return state
    }
}
