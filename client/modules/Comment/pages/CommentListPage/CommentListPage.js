import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Import Components
import CommentList from '../../components/CommentList';
import CommentCreateWidget from '../../components/CommentCreateWidget/CommentCreateWidget';

// Import Actions
import { addComment, fetchCommentsRequest, deleteComment } from '../../CommentAction';
// import {fetchPost} from "../../../Post/PostActions";
// import {PostDetailPage} from "../../../Post/pages/PostDetailPage/PostDetailPage";
// import { toggleAddPost } from '../../../App/AppActions';

// Import Selectors
import { getComments } from '../../CommentReducer';

class CommentListPage extends Component {
  componentDidMount() {
    this.props.dispatch(fetchCommentsRequest(this.props.author));
  }

  handleDeletePost = comment => {
    if (confirm('Do you want to delete this post')) {
      this.props.dispatch(deleteComment(comment));
    }
  };

  handleAddComment = (content) => {
    const author = this.props.author;
    this.props.dispatch(addComment({ author, content }));
  };

  render() {
    return (
      <div>
        <CommentList handleDeletePost={this.handleDeletePost} comments={this.props.comments} />
        <CommentCreateWidget addComment={this.handleAddComment} />
      </div>
    );
  }
}

// Actions required to provide data for this component to render in sever side.
CommentListPage.need = [params => {
  return fetchCommentsRequest(params.author);
}];

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    addComment: addComment(state),
    comments: getComments(state),
    // showComments: getComments(state),
  };
}

CommentListPage.propTypes = {
  author: PropTypes.string.isRequired,
  comments: PropTypes.arrayOf(PropTypes.shape({
    author: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
  })).isRequired,
  dispatch: PropTypes.func.isRequired,
};

CommentListPage.contextTypes = {
  router: PropTypes.object,
};

export default connect(mapStateToProps)(CommentListPage);
