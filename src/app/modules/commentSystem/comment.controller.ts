import httpStatus from 'http-status';
import { catchAsync } from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { CommentServices } from './comment.service';

const createComment = catchAsync(async (req, res) => {
  const result = await CommentServices.addComment(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'create comment successfully',
    data: result,
  });
});

const updateComment = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CommentServices.updateComment(id, req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Comment updated successfully',
    data: result,
  });
});

const deleteComment = catchAsync(async (req, res) => {
  const { id } = req.params;
  await CommentServices.deleteComment(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'comment deleted successfully',
    data: null,
  });
});

export const CommentControllers = {
  createComment,
  updateComment,
  deleteComment,
};
