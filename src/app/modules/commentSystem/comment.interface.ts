import { Types } from 'mongoose';

export type TComment = {
  postId: Types.ObjectId;
  userId: Types.ObjectId;
  content: string;
  parentId?: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
};
