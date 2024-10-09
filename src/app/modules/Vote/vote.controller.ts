import httpStatus from 'http-status';
import { catchAsync } from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { voteServices } from './vote.service';

const createVote = catchAsync(async (req, res) => {
  const result = await voteServices.addVote(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Vote added!',
    data: result,
  });
});
const getVote = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await voteServices.getVote(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'get Vote ',
    data: result,
  });
});

const updateVote = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await voteServices.updateVote(id, req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Vote updated',
    data: result,
  });
});

const deleteVote = catchAsync(async (req, res) => {
  const { id } = req.params;
  await voteServices.deleteVote(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Vote removed',
    data: null,
  });
});

export const VoteControllers = {
  createVote,
  getVote,
  updateVote,
  deleteVote,
};
