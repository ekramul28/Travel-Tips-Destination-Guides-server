/* eslint-disable @typescript-eslint/no-explicit-any */
import { ClientSession, startSession } from 'mongoose';
import { QueryBuilder } from '../../builder/QueryBuilder';
import Post from '../postCreating/postCreating.model';
import { TVote } from './vote.interface';
import { Vote } from './vote.model';

const addVote = async (payload: TVote) => {
  const { userId, postId, voteType } = payload;
  const session: ClientSession = await startSession();
  session.startTransaction();

  try {
    // Fetch the post within the session
    const post = await Post.findById(postId).session(session);
    if (!post) {
      throw new Error('Post Not Found');
    }

    // Check for an existing vote by the same user on the same post
    const existingVote = await Vote.findOne({ userId, postId }).session(
      session,
    );

    if (existingVote) {
      if (existingVote.voteType === voteType) {
        // If the same vote exists, remove it (toggle behavior)
        await Vote.findByIdAndDelete(existingVote._id).session(session);
        // Remove the vote reference from the post
        if (post.vote && post.vote.length > 0) {
          post.vote = post.vote.filter(
            (voteId) => !voteId.equals(existingVote._id),
          );
          await post.save({ session });
        }

        await session.commitTransaction();
        session.endSession();

        return {
          message: 'Vote removed',
          vote: existingVote,
        };
      } else {
        // If a different vote type exists, update it
        existingVote.voteType = voteType;
        await existingVote.save({ session });

        await session.commitTransaction();
        session.endSession();

        return {
          message: 'Vote updated',
          vote: existingVote,
        };
      }
    }

    // If no existing vote, create a new one
    const newVote = new Vote({ userId, postId, voteType });
    await newVote.save({ session });

    // Add the new vote's _id to the post's vote array
    if (post.vote && post.vote.length > 0) {
      post.vote.push(newVote._id);
      await post.save({ session });
    }

    await session.commitTransaction();
    session.endSession();

    return {
      message: 'Vote added',
      vote: newVote,
    };
  } catch (error: any) {
    // If any error occurs, abort the transaction
    await session.abortTransaction();
    session.endSession();

    return {
      error: error.message || 'An error occurred while processing the vote.',
    };
  }
};

const getVote = async (query: Record<string, unknown>) => {
  const postQuery = new QueryBuilder(
    Vote.find().populate('userId'),
    query,
  ).paginate();

  const result = await postQuery.modelQuery;

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

export const voteServices = {
  addVote,
  getVote,
  updateVote,
  deleteVote,
};
