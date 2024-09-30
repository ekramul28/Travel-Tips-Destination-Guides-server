import { TComment } from './comment.interface';
import { Comment } from './comment.model';

const addComment = async (payload: TComment) => {
  const result = await Comment.create(payload);
  return result;
};
const getComment = async (id: string) => {
  const result = await Comment.findById(id);

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
  // const deletedItemId = result?._id;
  // if (deletedItemId) {
  //   await deleteDocumentFromIndex('items', deletedItemId.toString());
  // }
  return result;
};

export const CommentServices = {
  addComment,
  getComment,
  updateComment,
  deleteComment,
};
