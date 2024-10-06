import { Types } from 'mongoose';
import { z } from 'zod';

export const voteValidationSchema = z.object({
  body: z.object({
    userId: z.string().refine((id) => Types.ObjectId.isValid(id), {
      message: 'Invalid user ID format',
    }),
    postId: z.string().refine((id) => Types.ObjectId.isValid(id), {
      message: 'Invalid post ID format',
    }),
    voteType: z.enum(['upvote', 'downvote']),
  }),
});
