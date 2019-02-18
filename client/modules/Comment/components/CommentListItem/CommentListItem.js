import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';

function CommentListItem(props) {
  return (
    <div>
      <h3>
        <Link to={`/posts/${props.comment.slug}-${props.comment.cuid}`} >
          {props.comment.author}
        </Link>
      </h3>
      <p><FormattedMessage id="by" /> {props.comment.author}</p>
      <p>{props.comment.content}</p>
      <p><a href="#" onClick={props.onDelete}><FormattedMessage id="deletePost" /></a></p>
      <hr />
    </div>
  );
}

CommentListItem.propTypes = {
  comment: PropTypes.shape({
    author: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    cuid: PropTypes.string.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default CommentListItem;
