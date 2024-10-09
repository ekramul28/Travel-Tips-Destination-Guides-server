import { Types } from 'mongoose';

export type TVote = {
  userId: Types.ObjectId;
  postId?: Types.ObjectId;
  voteType: 'upvote' | 'downvote';
  createdAt?: Date;
  updatedAt?: Date;
};
