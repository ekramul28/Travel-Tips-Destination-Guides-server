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
  const post = await PostServices.createPostIntoDB(
    req.body,
    req.files as TImageFiles,
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Item created successfully',
    data: post,
  });
});

const getAllPost = catchAsync(async (req, res) => {
  const item = await PostServices.getAllPostFromFromDB(req.query);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Item retrieved successfully',
    data: item,
  });
});

const getPost = catchAsync(async (req, res) => {
  const itemId = req.params.id;
  const item = await PostServices.getPostFromDB(itemId);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Item retrieved successfully',
    data: item,
  });
});
const getPostByUser = catchAsync(async (req, res) => {
  const userId = req.params.id;
  console.log('man', userId);
  const result = await PostServices.getPostByUserFromDB(userId);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'post retrieved successfully',
    data: result,
  });
});

const updatePost = catchAsync(async (req, res) => {
  const { id } = req.params;
  const updatedItem = await PostServices.updatePostInDB(id, req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Item updated successfully',
    data: updatedItem,
  });
});

const deletePost = catchAsync(async (req, res) => {
  const { id } = req.params;
  await PostServices.deletePostFromDB(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Item deleted successfully',
    data: null,
  });
});

export const PostControllers = {
  createPost,
  getAllPost,
  getPostByUser,
  getPost,
  updatePost,
  deletePost,
};
