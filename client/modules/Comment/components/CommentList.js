import React from 'react';
import PropTypes from 'prop-types';

// Import Components
import CommentListItem from './CommentListItem/CommentListItem';

function CommentList(props) {
  const listCommetns = props.comments || [];
  return (
    <div>
      {
        listCommetns.map(comment => (
          <CommentListItem comments={comment} key={comment.cuid} onDelete={() => props.handleDeleteComment(comment.cuid)} />
        ))
      }
    </div>
  );
}

CommentList.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.shape({
    author: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    cuid: PropTypes.string.isRequired,
  })).isRequired,
  handleDeleteComment: PropTypes.func.isRequired,
};

export default CommentList;
