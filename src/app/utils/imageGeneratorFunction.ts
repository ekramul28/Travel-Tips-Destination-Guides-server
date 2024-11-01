/* eslint-disable @typescript-eslint/no-explicit-any */
import { TImageFile } from '../interfaces/image.interface';
import { sendImageToCloudinary } from './sendImageToCloudinary';
async function uploadImagesToCloudinary(
  postImages: TImageFile[],
): Promise<string[]> {
  const uploadPromises = postImages.map(async (image) => {
    const { secure_url }: any = await sendImageToCloudinary(
      image.originalname,
      image.path,
    );
    return secure_url;
  });
  const secureUrls = await Promise.all(uploadPromises);

  return secureUrls;
}

export default uploadImagesToCloudinary;
