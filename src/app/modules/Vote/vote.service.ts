import { TVote } from './vote.interface';
import { Vote } from './vote.model';

const addVote = async (payload: TVote) => {
  const result = await Vote.create(payload);
  return result;
};
const getVote = async (id: string) => {
  const result = await Vote.find({ voteId: id });

  return result;
};

const updateVote = async (commentId: string, payload: { content: string }) => {
  const result = await Vote.findByIdAndUpdate(commentId, payload, {
    new: true,
  });

  return result;
};
const deleteVote = async (commentId: string) => {
  const result = await Vote.findByIdAndDelete(commentId);

  return result;
};

export const CommentServices = {
  addVote,
  getVote,
  updateVote,
  deleteVote,
};
