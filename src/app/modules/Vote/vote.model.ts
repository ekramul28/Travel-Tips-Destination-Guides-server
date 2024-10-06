import { model, Schema } from 'mongoose';
import { TVote } from './vote.interface';

const VoteSchema = new Schema<TVote>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    postId: {
      type: Schema.Types.ObjectId,
      ref: 'Post',
      required: true,
    },
    voteType: {
      type: String,
      enum: ['upvote', 'downvote'],
      required: true,
    },
  },
  { timestamps: true },
);

export const Vote = model<TVote>('Vote', VoteSchema);
