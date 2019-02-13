import { Router } from 'express';
import * as CommentController from '../controllers/comment.controller';
const router = new Router();

// Get all Comments by author
router.route('/posts/:author').get(CommentController.getCommentsByAuthor);

// Get one comment by cuid
router.route('/posts/:cuid').get(CommentController.getComment);

// Add a new Comment
router.route('/posts').post(CommentController.addComment);

// Edit comment
router.route('/comments').put(CommentController.editComment);

// Delete a comment by cuid
router.route('/posts/:cuid').delete(CommentController.deleteComment);

export default router;
