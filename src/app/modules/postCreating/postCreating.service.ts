import { TImageFiles } from '../../interfaces/image.interface';

import { TPost } from './postCreating.interface';
import Post from './postCreating.model';

const createPostIntoDB = async (payload: TPost, images: TImageFiles) => {
  const { itemImages } = images;
  payload.images = itemImages.map((image) => image.path);

  const result = await Post.create(payload);

  // await addDocumentToIndex(result, 'items');
  return result;
};

export const PostServices = {
  createPostIntoDB,
};
