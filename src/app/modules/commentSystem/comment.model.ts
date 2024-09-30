import mongoose, { Schema } from 'mongoose';
import { TComment } from './comment.interface';

const commentSchema = new Schema<TComment>(
  {
    postId: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
    authorId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
    parentId: { type: Schema.Types.ObjectId, ref: 'Comment', default: null },
  },
  {
    timestamps: true,
  },
);

// Mongoose Model
export const Comment = mongoose.model<TComment>('Comment', commentSchema);
