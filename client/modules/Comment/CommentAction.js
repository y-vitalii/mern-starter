import callApi from '../../util/apiCaller';

// Export Constants
export const ADD_COMMENT = 'ADD_COMMENT';
export const EDIT_COMMENT = 'EDIT_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';

// Export Actions
export function addComment(comment) {
  return {
    type: ADD_COMMENT,
    comment,
  };
}

export function addCommentRequest(comment) {
  return (dispatch) => {
    return callApi('comments', 'post', {
      comment: {
        author: comment.author,
        content: comment.content,
      },
    }).then(res => dispatch(addComment(res.comment)));
  };
}

export function editComment(comment) {
  return {
    type: EDIT_COMMENT,
    comment,
  };
}

export function editCommentRequest(cuid) {
  return (dispatch) => {
    return callApi('comments', 'put').then(() => dispatch(editComment(cuid)));
  };
}

export function fetchCommentsRequest(author) {
  return (dispatch) => {
    return callApi(`/comments/${author}`).then(res => {
      dispatch(addComment(res.comments));
    });
  };
}

export function deleteComment(cuid) {
  return {
    type: DELETE_COMMENT,
    cuid,
  };
}

export function deleteCommentRequest(cuid) {
  return (dispatch) => {
    return callApi(`comments/${cuid}`, 'delete').then(() => dispatch(deleteComment(cuid)));
  };
}
