import { Types } from 'mongoose';

export type TComment = {
  authorId: Types.ObjectId;
  content: string;
  parentId?: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
};
