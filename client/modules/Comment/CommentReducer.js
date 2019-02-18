import { ADD_COMMENT, EDIT_COMMENT, DELETE_COMMENT } from './CommentAction';

// Initial State
const initialState = { data: [] };

const CommentReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_COMMENT :
      return {
        data: [action.comment, ...state.data],
      };

    case EDIT_COMMENT :
      return {
        data: action.comment,
      };

    case DELETE_COMMENT :
      return {
        data: state.data.filter(comment => comment.cuid !== action.cuid),
      };

    default:
      return state;
  }
};

/* Selectors */

// Get all comments by author
export const getComments = (state, author) => state.comments.data.filter(comment => comment.author === author)[0];

// Export Reducer
export default CommentReducer;
