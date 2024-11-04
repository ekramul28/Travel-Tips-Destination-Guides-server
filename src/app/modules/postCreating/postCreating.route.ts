import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../User/user.constant';
import validateRequest from '../../middlewares/validateRequest';
import {
  PostValidation,
  UpdatePostValidation,
} from './postCreating.validation';
import { PostControllers } from './postCreating.controller';
import validateImageFileRequest from '../../middlewares/validateImageFileRequest';
import { ImageFilesArrayZodSchema } from '../../zod/image.validation';
import { parseBody } from '../../middlewares/bodyParser';
import { upload } from '../../utils/sendImageToCloudinary';

const router = express.Router();

router.post(
  '/',
  upload.fields([{ name: 'postImages' }]),
  validateImageFileRequest(ImageFilesArrayZodSchema),
  parseBody,
  validateRequest(PostValidation),
  PostControllers.createPost,
);

router.get('/', PostControllers.getAllPost);
router.get('/userPost/:id', PostControllers.getPostByUser);

router.get('/:id', PostControllers.getPost);

router.put(
  '/:id',
  auth(USER_ROLE.USER),
  validateRequest(UpdatePostValidation),
  PostControllers.updatePost,
);

router.delete('/:id', auth(USER_ROLE.USER), PostControllers.deletePost);

export const PostRoutes = router;
