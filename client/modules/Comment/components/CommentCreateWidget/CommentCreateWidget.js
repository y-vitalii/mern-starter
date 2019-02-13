import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';

// Import Style
import styles from './CommentCreateWidget.css';

export class CommentCreateWidget extends Component {
  addComment = () => {
    const contentRef = this.refs.content;
    if (contentRef.value) {
      this.props.addComment(contentRef.value);
      contentRef.value = '';
    }
  };

  render() {
    return (
      <div>
        <div className={styles['form-content']}>
          <h2 className={styles['form-title']}><FormattedMessage id="CreateNewComment" /></h2>
          <textarea className={styles['form-field']} ref="content" />
          <a className={styles['post-submit-button']} href="#" onClick={this.addComment}><FormattedMessage id="submit" /></a>
        </div>
      </div>
    );
  }
}

CommentCreateWidget.propTypes = {
  addComment: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
};

export default injectIntl(CommentCreateWidget);
