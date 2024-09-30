/* eslint-disable @typescript-eslint/no-explicit-any */
import { QueryBuilder } from '../../builder/QueryBuilder';
import { TImageFiles } from '../../interfaces/image.interface';
import { sendImageToCloudinary } from '../../utils/sendImageToCloudinary';
import {
  SearchItemByDateRangeQueryMaker,
  SearchItemByUserQueryMaker,
} from './post.utils';
import { PostSearchableFields } from './postCreating.constant';

import { TPost } from './postCreating.interface';
import Post from './postCreating.model';

const createPostIntoDB = async (payload: TPost, images: TImageFiles) => {
  const { postImages } = images;

  if (postImages && postImages.length > 0) {
    const uploadedImages = await Promise.all(
      postImages.map(async (file) => {
        const imageName = `${payload.authorId}-${Date.now()}`;
        const path = file.path;

        // Upload the image to Cloudinary (or another service)
        const { secure_url }: any = await sendImageToCloudinary(
          imageName,
          path,
        );

        // Return the URL for each uploaded image
        return secure_url;
      }),
    );

    // Assign the uploaded image URLs to the payload
    payload.images = uploadedImages;
  }

  const result = await Post.create(payload);

  return result;
};

const getAllPostFromFromDB = async (query: Record<string, unknown>) => {
  query = (await SearchItemByUserQueryMaker(query)) || query;

  // Date range search
  query = (await SearchItemByDateRangeQueryMaker(query)) || query;

  const postQuery = new QueryBuilder(
    Post.find().populate('user').populate('category'),
    query,
  )
    .filter()
    .search(PostSearchableFields)
    .sort()
    // .paginate()
    .fields();

  const result = await postQuery.modelQuery;

  return result;
};

const getPostFromDB = async (itemId: string) => {
  const result = await Post.findById(itemId)
    .populate('user')
    .populate('category');
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
  getPostFromDB,
  updatePostInDB,
  deletePostFromDB,
};
