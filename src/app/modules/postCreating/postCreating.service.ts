/* eslint-disable @typescript-eslint/no-explicit-any */
import { TImageFiles } from '../../interfaces/image.interface';
import { sendImageToCloudinary } from '../../utils/sendImageToCloudinary';

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

export const PostServices = {
  createPostIntoDB,
};
