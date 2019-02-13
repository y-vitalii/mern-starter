import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Import Components
// import CommentList from '../../components/CommentList';
import CommentCreateWidget from '../../components/CommentCreateWidget/CommentCreateWidget';

// Import Actions
import { addComment, fetchCommentsRequest, deleteComment } from '../../CommentAction';
import { toggleAddPost } from '../../../App/AppActions';

// Import Selectors
// import { getComments } from '../../CommentReducer';

class CommentListPage extends Component {
  componentDidMount() {
    this.props.dispatch(fetchCommentsRequest());
  }

  handleDeletePost = comment => {
    if (confirm('Do you want to delete this post')) {
      this.props.dispatch(deleteComment(comment));
    }
  };

  handleAddPost = (name, title, content) => {
    this.props.dispatch(toggleAddPost());
    this.props.dispatch(addComment({ name, title, content }));
  };

  render() {
    return (
      <div>
        {/* <CommentList handleDeletePost={this.handleDeletePost} posts={this.props.showComments} />*/}
        <CommentCreateWidget addComment={this.handleAddPost} />
      </div>
    );
  }
}

// Actions required to provide data for this component to render in sever side.
CommentListPage.need = [() => { return fetchCommentsRequest(); }];

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    addComment: addComment(state),
    // showComments: getComments(state),
  };
}

CommentListPage.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.shape({
    author: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
  })).isRequired,
  addComment: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
};

CommentListPage.contextTypes = {
  router: PropTypes.object,
};

export default connect(mapStateToProps)(CommentListPage);
