import mongoose, { Schema } from 'mongoose';
import { TPost } from './postCreating.interface';
import { POST_CATEGORY, POST_STATUS } from './postCreating.constant';

// Define the schema for the post
const PostSchema: Schema = new Schema<TPost>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    images: {
      type: [String],
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    premium: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(POST_STATUS),
      default: POST_STATUS.ACTIVE,
      required: true,
    },
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    category: {
      type: String,
      enum: Object.values(POST_CATEGORY),
      required: true,
    },

    vote: [{ type: mongoose.Types.ObjectId, ref: 'Vote' }],
    comment: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'Comment',
      },
    ],
  },
  {
    timestamps: true,
  },
);

const Post = mongoose.model<TPost>('Post', PostSchema);

export default Post;
