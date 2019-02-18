import { Router } from 'express';
import * as CommentController from '../controllers/comment.controller';
const router = new Router();

// Get all Comments by author
router.route('/comments/:author').get(CommentController.getCommentsByAuthor);

// // Get one comment by cuid
// router.route('/comments/:cuid').get(CommentController.getComment);

// Add a new Comment
router.route('/comments').post(CommentController.addComment);

// Edit comment
router.route('/comments').put(CommentController.editComment);

// Delete a comment by cuid
router.route('/comments/:cuid').delete(CommentController.deleteComment);

export default router;
