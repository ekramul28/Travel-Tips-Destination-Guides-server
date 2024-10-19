/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose';
import { QueryBuilder } from '../../builder/QueryBuilder';
import { TImageFiles } from '../../interfaces/image.interface';
import getImageLinkInCloudinary from '../../utils/getImageLinkInCloudinary';
import {
  SearchItemByDateRangeQueryMaker,
  SearchItemByUserQueryMaker,
} from './post.utils';
import { PostSearchableFields } from './postCreating.constant';

import { TPost } from './postCreating.interface';
import Post from './postCreating.model';

const createPostIntoDB = async (payload: TPost, images: TImageFiles) => {
  const { postImages } = images;

  await getImageLinkInCloudinary(postImages, payload);

  const result = await Post.create(payload);

  return result;
};

const getAllPostFromFromDB = async (query: Record<string, unknown>) => {
  query = (await SearchItemByUserQueryMaker(query)) || query;

  // Date range search
  query = (await SearchItemByDateRangeQueryMaker(query)) || query;

  const postQuery = new QueryBuilder(
    Post.find()
      .populate('authorId')
      .populate('category')
      .populate('vote')
      .populate({
        path: 'comment',
        populate: {
          path: 'userId',
          model: 'User',
        },
      }),
    query,
  )
    .filter()
    .search(PostSearchableFields)
    .sort()
    .paginate()
    .fields();

  const result = await postQuery.modelQuery;

  return result;
};

const getPostFromDB = async (itemId: string) => {
  const result = await Post.findById(itemId)
    .populate('authorId')
    .populate('vote');
  return result;
};
const getPostByUserFromDB = async (authorId: string) => {
  const objectId = new mongoose.Types.ObjectId(authorId);
  const result = await Post.find({ authorId: objectId })
    .populate('authorId')
    .populate({
      path: 'vote', // Populate the vote field
      populate: { path: 'userId', select: 'name profilePhoto' }, // Optionally populate the user who voted
    });
  return result;
};

const updatePostInDB = async (PostId: string, payload: TPost) => {
  const result = await Post.findByIdAndUpdate(PostId, payload, { new: true });
  // if (result) {
  //   await addDocumentToIndex(result, 'items');
  // } else {
  //   throw new Error(`Item with ID ${itemId} not found.`);
  // }
  return result;
};

const deletePostFromDB = async (itemId: string) => {
  const result = await Post.findByIdAndDelete(itemId);
  // const deletedItemId = result?._id;
  // if (deletedItemId) {
  //   await deleteDocumentFromIndex('items', deletedItemId.toString());
  // }
  return result;
};

export const PostServices = {
  createPostIntoDB,
  getAllPostFromFromDB,
  getPostByUserFromDB,
  getPostFromDB,
  updatePostInDB,
  deletePostFromDB,
};
