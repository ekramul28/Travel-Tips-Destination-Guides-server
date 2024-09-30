/* eslint-disable @typescript-eslint/no-explicit-any */
import { sendImageToCloudinary } from './sendImageToCloudinary';

const getImageLinkInCloudinary = async (postImages: any[], payload: any) => {
  if (postImages && postImages.length > 0) {
    const uploadedImages = await Promise.all(
      postImages.map(async (file: any) => {
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
};

export default getImageLinkInCloudinary;
