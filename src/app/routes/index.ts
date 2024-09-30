import express from 'express';
import { AuthRoutes } from '../modules/Auth/auth.route';
import { ProfileRoutes } from '../modules/Profile/profile.route';
import { PostRoutes } from '../modules/postCreating/postCreating.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/post',
    route: PostRoutes,
  },
  {
    path: '/profile',
    route: ProfileRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
