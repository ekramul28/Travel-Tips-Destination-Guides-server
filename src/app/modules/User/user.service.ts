import mongoose from 'mongoose';
import { QueryBuilder } from '../../builder/QueryBuilder';
import { UserSearchableFields } from './user.constant';
import { TUser } from './user.interface';
import { User } from './user.model';

interface IAddFollowPayload {
  userId: string; // The ID of the user who wants to follow
  followId: string; // The ID of the user to be followed
}

const createUser = async (payload: TUser) => {
  const user = await User.create(payload);

  return user;
};

const getAllUsersFromDB = async (query: Record<string, unknown>) => {
  const users = new QueryBuilder(User.find(), query)
    .fields()
    .paginate()
    .sort()
    .filter()
    .search(UserSearchableFields);

  const result = await users.modelQuery;

  return result;
};

const getSingleUserFromDB = async (id: string) => {
  const user = await User.findById(id);

  return user;
};

const addFollow = async (payload: IAddFollowPayload) => {
  const { userId, followId } = payload;

  // Validate ObjectIds
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new Error('Invalid userId');
  }
  if (!mongoose.Types.ObjectId.isValid(followId)) {
    throw new Error('Invalid followId');
  }

  // Prevent users from following themselves
  if (userId === followId) {
    throw new Error('You cannot follow yourself');
  }

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Convert to ObjectId
    const userObjectId = new mongoose.Types.ObjectId(userId);
    const followObjectId = new mongoose.Types.ObjectId(followId);

    // Fetch both users within the session
    const [follower, targetUser] = await Promise.all([
      User.findById(userObjectId).session(session),
      User.findById(followObjectId).session(session),
    ]);

    // Check if both users exist
    if (!follower) {
      throw new Error('User not found');
    }
    if (!targetUser) {
      throw new Error('User to follow not found');
    }

    let isAlreadyFollowing;

    if (follower?.following) {
      isAlreadyFollowing = follower.following.some(
        (id) => id.toString() === followId,
      );
    }
    // Check if already following
    if (isAlreadyFollowing) {
      throw new Error('You are already following this user');
    }
    if (follower?.following) {
      // Add followId to follower's following array
      follower?.following.push(followObjectId);
    }

    if (targetUser?.followers) {
      // Add userId to targetUser's followers array
      targetUser?.followers.push(userObjectId);
    }

    // Save both users
    await Promise.all([
      follower.save({ session }),
      targetUser.save({ session }),
    ]);

    // Commit the transaction
    await session.commitTransaction();
    session.endSession();

    return {
      message: 'Successfully followed the user',
      follower,
    };
  } catch (error) {
    // Abort the transaction in case of error
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

const removeFollow = async (payload: IAddFollowPayload) => {
  const { userId, followId } = payload;

  // Validate ObjectIds
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new Error('Invalid userId');
  }
  if (!mongoose.Types.ObjectId.isValid(followId)) {
    throw new Error('Invalid followId');
  }

  // Prevent users from unfollowing themselves
  if (userId === followId) {
    throw new Error('You cannot unfollow yourself');
  }

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Convert to ObjectId
    const userObjectId = new mongoose.Types.ObjectId(userId);
    const followObjectId = new mongoose.Types.ObjectId(followId);

    // Fetch both users within the session
    const [follower, targetUser] = await Promise.all([
      User.findById(userObjectId).session(session),
      User.findById(followObjectId).session(session),
    ]);

    // Check if both users exist
    if (!follower) {
      throw new Error('User not found');
    }
    if (!targetUser) {
      throw new Error('User to unfollow not found');
    }

    let isFollowing;

    if (follower?.following) {
      isFollowing = follower.following.some((id) => id.toString() === followId);
    }

    // Check if not following
    if (!isFollowing) {
      throw new Error('You are not following this user');
    }

    if (follower?.following) {
      // Remove followId from follower's following array
      follower.following = follower.following.filter(
        (id) => id.toString() !== followId,
      );
    }

    if (targetUser?.followers) {
      // Remove userId from targetUser's followers array
      targetUser.followers = targetUser.followers.filter(
        (id) => id.toString() !== userId,
      );
    }

    // Save both users
    await Promise.all([
      follower.save({ session }),
      targetUser.save({ session }),
    ]);

    // Commit the transaction
    await session.commitTransaction();
    session.endSession();

    return {
      message: 'Successfully unfollowed the user',
      follower,
    };
  } catch (error) {
    // Abort the transaction in case of error
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

export const UserServices = {
  createUser,
  addFollow,
  removeFollow,
  getAllUsersFromDB,
  getSingleUserFromDB,
};
