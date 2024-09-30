import { Types } from 'mongoose';

export type TComment = {
  postId: Types.ObjectId;
  authorId: Types.ObjectId;
  content: string;
  parentId?: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
};
