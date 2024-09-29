import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../User/user.constant';
import validateRequest from '../../middlewares/validateRequest';
import { PostValidation } from './postCreating.validation';
import { PostControllers } from './postCreating.controller';

const router = express.Router();

router.post(
  '/',
  auth(USER_ROLE.USER),
  multerUpload.fields([{ name: 'itemImages' }]),
  validateImageFileRequest(ImageFilesArrayZodSchema),
  parseBody,
  validateRequest(PostValidation),
  PostControllers.createPost,
);

export const ItemRoutes = router;
