import { JwtPayload } from 'jsonwebtoken';
import { User } from '../User/user.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { USER_STATUS } from '../User/user.constant';
import { TImageFile } from '../../interfaces/image.interface';
import { TUserProfileUpdate } from './profile.interface';
import getImageLinkInCloudinary from '../../utils/getImageLinkInCloudinary';

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
  data: Partial<TUserProfileUpdate>,
  profilePhoto: TImageFile[],
) => {
  console.log({ data });
  console.log({ profilePhoto });

  const filter = {
    email: user.email,
    status: USER_STATUS.ACTIVE,
  };

  const profile = await User.findOne(filter);

  if (!profile) {
    throw new AppError(httpStatus.NOT_FOUND, 'User profile does not exixts!');
  }

  await getImageLinkInCloudinary(profilePhoto, {
    data,
  });

  return await User.findOneAndUpdate(filter, data, { new: true });
};

export const ProfileServices = {
  getMyProfile,
  updateMyProfile,
};
