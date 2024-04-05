// reducers.js
const initialState = {
    visibility: 2,
    dialogueIndex: 0
  };
  
  const rootReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_VISIBILITY':
        return {
          ...state,
          visibility: action.payload
        };
      case 'SET_DIALOGUE_INDEX':
        return {
          ...state,
          dialogueIndex: action.payload
        };
      default:
        return state;
    }
  };
  
  export default rootReducer;