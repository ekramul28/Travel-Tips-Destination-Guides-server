import { JwtPayload } from 'jsonwebtoken';
import { User } from '../User/user.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { USER_STATUS } from '../User/user.constant';
import { TImageFile } from '../../interfaces/image.interface';
import { TUserProfileUpdate } from './profile.interface';
import uploadImagesToCloudinary from '../../utils/imageGeneratorFunction';

const getMyProfile = async (user: JwtPayload) => {
  const profile = await User.findOne({
    email: user.email,
    status: USER_STATUS.ACTIVE,
  });

  if (!profile) {
    throw new AppError(httpStatus.NOT_FOUND, 'User does not exixts!');
  }

  return profile;
};

const updateMyProfile = async (
  user: JwtPayload,
  payload: Partial<TUserProfileUpdate>,
  profilePhoto: TImageFile[],
) => {
  const filter = {
    email: user.email,
    status: USER_STATUS.ACTIVE,
  };

  const profile = await User.findOne(filter);

  if (!profile) {
    throw new AppError(httpStatus.NOT_FOUND, 'User profile does not exixts!');
  }
  const res = await uploadImagesToCloudinary(profilePhoto.profilePhoto);
  // await getImageLinkInCloudinary(profilePhoto, payload);
  payload.profilePhoto = res[0];

  return await User.findOneAndUpdate(filter, payload, { new: true });
};

export const ProfileServices = {
  getMyProfile,
  updateMyProfile,
};
