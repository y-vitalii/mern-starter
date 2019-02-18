import Comment from '../models/comment';
import cuid from 'cuid';
import slug from 'limax';
import sanitizeHtml from 'sanitize-html';

/**
 * Get all posts
 * @param req
 * @param res
 * @returns void
 */
export function getCommentsByAuthor(req, res) {
  Comment.find({ author: req.params.author }).sort('-dateAdded').exec((err, comments) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ comments });
  });
}

/**
 * Edit comment
 * @param req
 * @param res
 */
export function editComment(req, res) {
  Comment.findOneAndUpdate({ cuid: req.params.cuid }).exec((err) => {
    if (err) return res.send(500, { error: err });
    return res.send('succesfully saved');
  });
}

/**
 * Save a post
 * @param req
 * @param res
 * @returns void
 */
export function addComment(req, res) {
  if (!req.body.comment.author || !req.body.comment.content) {
    res.status(403).end();
  }

  const newComment = new Comment(req.body.comment);
  // Let's sanitize inputs
  newComment.author = sanitizeHtml(newComment.author);
  newComment.content = sanitizeHtml(newComment.content);
  newComment.slug = slug(newComment.title.toLowerCase(), { lowercase: true });
  newComment.cuid = cuid();
  newComment.save((err, saved) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ comment: saved });
  });
}

/**
 * Get a single post
 * @param req
 * @param res
 * @returns void
 */
export function getComment(req, res) {
  Comment.findOne({ cuid: req.params.cuid }).exec((err, comment) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ comment });
  });
}

/**
 * Delete a post
 * @param req
 * @param res
 * @returns void
 */
export function deleteComment(req, res) {
  Comment.findOne({ cuid: req.params.cuid }).exec((err, comment) => {
    if (err) {
      res.status(500).send(err);
    }

    comment.remove(() => {
      res.status(200).end();
    });
  });
}
