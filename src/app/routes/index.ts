import express from 'express';
import { AuthRoutes } from '../modules/Auth/auth.route';
import { ProfileRoutes } from '../modules/Profile/profile.route';
import { PostRoutes } from '../modules/postCreating/postCreating.route';
import { UserRoutes } from '../modules/User/user.route';
import { CommentRoutes } from '../modules/commentSystem/comment.route';
import { ItemCategoryRoutes } from '../modules/ItemCategory/itemCategory.route';
import { VoteRoutes } from '../modules/Vote/vote.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/user',
    route: UserRoutes,
  },
  {
    path: '/post',
    route: PostRoutes,
  },
  {
    path: '/vote',
    route: VoteRoutes,
  },
  {
    path: '/comment',
    route: CommentRoutes,
  },
  {
    path: '/item-categories',
    route: ItemCategoryRoutes,
  },
  {
    path: '/profile',
    route: ProfileRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
