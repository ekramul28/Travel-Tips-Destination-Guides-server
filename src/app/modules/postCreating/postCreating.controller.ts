import httpStatus from 'http-status';
import sendResponse from '../../utils/sendResponse';
import { catchAsync } from '../../utils/catchAsync';
import AppError from '../../errors/AppError';
import { TImageFiles } from '../../interfaces/image.interface';
import { PostServices } from './postCreating.service';

const createPost = catchAsync(async (req, res) => {
  if (!req.files) {
    throw new AppError(400, 'Please upload an image');
  }

  const item = await PostServices.createPostIntoDB(
    req.body,
    req.files as TImageFiles,
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Item created successfully',
    data: item,
  });
});

export const PostControllers = {
  createPost,
};
