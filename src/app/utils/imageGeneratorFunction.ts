/* eslint-disable @typescript-eslint/no-explicit-any */
import { TImageFile } from '../interfaces/image.interface';
import { sendImageToCloudinary } from './sendImageToCloudinary';
async function uploadImagesToCloudinary(
  images: TImageFile[],
): Promise<string[]> {
  const uploadPromises = images.map(async (image) => {
    const { secure_url }: any = await sendImageToCloudinary(
      image.fieldname,
      image.path,
    );
    return secure_url;
  });

  const secureUrls = await Promise.all(uploadPromises);
  return secureUrls;
}

export default uploadImagesToCloudinary;
