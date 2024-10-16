import httpStatus from 'http-status';
import { catchAsync } from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { UserServices } from './user.service';

const userRegister = catchAsync(async (req, res) => {
  const user = await UserServices.createUser(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User Created Successfully',
    data: user,
  });
});

const getAllUsers = catchAsync(async (req, res) => {
  const users = await UserServices.getAllUsersFromDB(req.query);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Users Retrieved Successfully',
    data: users,
  });
});

const getSingleUser = catchAsync(async (req, res) => {
  const user = await UserServices.getSingleUserFromDB(req.params.id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User Retrieved Successfully',
    data: user,
  });
});

const addFollower = catchAsync(async (req, res) => {
  await UserServices.addFollow(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Follower successfully',
    data: null,
  });
});
const removeFollow = catchAsync(async (req, res) => {
  await UserServices.removeFollow(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'UnFollower successfully',
    data: null,
  });
});

export const UserControllers = {
  getSingleUser,
  userRegister,
  removeFollow,
  addFollower,
  getAllUsers,
};
