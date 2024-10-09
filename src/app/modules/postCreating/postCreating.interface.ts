import mongoose, { ObjectId } from 'mongoose';
import { DISTRICTS, POST_CATEGORY, POST_STATUS } from './postCreating.constant';
import { TComment } from '../commentSystem/comment.interface';
import { TVote } from '../Vote/vote.interface';
type District = (typeof DISTRICTS)[number];

export type TPost = {
  title: string;
  description: string;
  images: string[];
  city: District;
  location: string;
  status?: keyof typeof POST_STATUS;
  authorId: ObjectId;
  category: keyof typeof POST_CATEGORY;
  vote?: mongoose.Types.ObjectId[];
  comment?: mongoose.Types.ObjectId[];
  createdAt?: Date;
  updatedAt?: Date;
};
