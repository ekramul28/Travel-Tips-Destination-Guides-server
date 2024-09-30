import { z } from 'zod';
import { Types } from 'mongoose';

const objectIdValidation = z
  .string()
  .refine((id) => Types.ObjectId.isValid(id), {
    message: 'Invalid ObjectId',
  });

export const CommentValidation = z.object({
  body: z.object({
    postId: objectIdValidation,
    authorId: objectIdValidation,
    content: z.string().min(1, { message: 'Content is required' }),
    parentId: objectIdValidation.optional(),
  }),
});

export const EditCommentValidation = z.object({
  body: z.object({
    content: z.string().min(1, { message: 'Content is required' }),
  }),
});

export const DeleteCommentValidation = z.object({
  body: z.object({
    postId: objectIdValidation,
    authorId: objectIdValidation,
    commentId: objectIdValidation,
  }),
});
