/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose, { ClientSession, startSession } from 'mongoose';
import { TComment } from './comment.interface';
import { Comment } from './comment.model';
import Post from '../postCreating/postCreating.model';

const addComment = async (payload: TComment) => {
  const { postId } = payload;
  const session: ClientSession = await startSession();
  session.startTransaction();

  try {
    // Fetch the post within the session
    const objectId = new mongoose.Types.ObjectId(postId);

    const post = await Post.findOne({ _id: objectId }).session(session);

    if (!post) {
      throw new Error('Post Not Found');
    }

    const result = await Comment.create(payload);
    const populatedResult = await result.populate('userId');
    console.log('hmm', populatedResult);
    console.log('hmm2', result);
    // Add the new vote's _id to the post's vote array
    if (post.comment) {
      post.comment.push(result._id);
      await post.save({ session });
    }

    await session.commitTransaction();
    session.endSession();

    return {
      message: 'Comment added',
      result: populatedResult,
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
const getComment = async (id: string) => {
  const result = await Comment.find({ postId: id });

  return result;
};

const updateComment = async (
  commentId: string,
  payload: { content: string },
) => {
  const result = await Comment.findByIdAndUpdate(commentId, payload, {
    new: true,
  });

  return result;
};
const deleteComment = async (commentId: string) => {
  const result = await Comment.findByIdAndDelete(commentId);

  return result;
};

export const CommentServices = {
  addComment,
  getComment,
  updateComment,
  deleteComment,
};
