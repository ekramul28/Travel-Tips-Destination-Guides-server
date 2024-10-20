/* eslint-disable @typescript-eslint/no-explicit-any */
import { sendImageToCloudinary } from './sendImageToCloudinary';
async function uploadImagesToCloudinary(
  images: { imageName: string; path: string }[],
): Promise<string[]> {
  const uploadPromises = images.map(async (image) => {
    const { secure_url }: any = await sendImageToCloudinary(
      image.imageName,
      image.path,
    );
    return secure_url;
  });

  const secureUrls = await Promise.all(uploadPromises);
  return secureUrls;
}

export default uploadImagesToCloudinary;
