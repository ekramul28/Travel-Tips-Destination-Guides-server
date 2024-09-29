import { z } from 'zod';
import { POST_CATEGORY, POST_STATUS } from './postCreating.constant';

export const PostValidation = z.object({
  title: z
    .string()
    .min(1, { message: 'Title is required' })
    .max(255, { message: 'Title must be less than 255 characters' })
    .trim(),
  description: z.string().min(1, { message: 'Description is required' }),
  images: z
    .array(z.string())
    .nonempty({ message: 'At least one image is required' }),
  city: z.string().min(1, { message: 'City is required' }),
  location: z.string().min(1, { message: 'Location is required' }),
  status: z.nativeEnum(POST_STATUS).default(POST_STATUS.ACTIVE),
  authorId: z.string().min(1, { message: 'Author ID is required' }),
  category: z.nativeEnum(POST_CATEGORY, {
    errorMap: () => ({ message: 'Invalid category' }),
  }),
  upvote: z.number().min(0).optional().default(0),
  downvote: z.number().min(0).optional().default(0),
});
