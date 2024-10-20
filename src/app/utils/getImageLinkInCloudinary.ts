/* eslint-disable @typescript-eslint/no-explicit-any */
import { sendImageToCloudinary } from './sendImageToCloudinary';

const getImageLinkInCloudinary = async (profilePhoto: any[], payload: any) => {
  console.log('filefile', profilePhoto.profilePhoto);
  console.log('filefile2', payload);
  if (profilePhoto) {
    const uploadedImages = await Promise.all(
      profilePhoto.map(async (file: any) => {
        const imageName = `${payload?.authorId}-${Date.now()}`;
        const path = file.path;
        console.log('inside image', file);
        console.log('inside path', path);
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
    if (payload.images) {
      payload.images = uploadedImages;
    } else {
      payload.profilePhoto = uploadedImages[0];
    }
  }
};

export default getImageLinkInCloudinary;
