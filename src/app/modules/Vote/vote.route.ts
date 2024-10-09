import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { USER_ROLE } from '../User/user.constant';
import auth from '../../middlewares/auth';
import { EditVoteValidation, voteValidationSchema } from './vote.validation';
import { VoteControllers } from './vote.controller';

const router = express.Router();

router.post(
  '/',
  auth(USER_ROLE.USER),
  validateRequest(voteValidationSchema),
  VoteControllers.createVote,
);

router.get('/:id', VoteControllers.getVote);

router.put(
  '/:id',
  auth(USER_ROLE.USER),
  validateRequest(EditVoteValidation),
  VoteControllers.updateVote,
);

router.delete('/:id', auth(USER_ROLE.USER), VoteControllers.deleteVote);

export const VoteRoutes = router;
