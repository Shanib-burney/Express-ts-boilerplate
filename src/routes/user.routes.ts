import { Router } from 'express';
import { userController } from '../controllers/user.controller';
import { validate } from '../middlewares/validate';
import {
  createUserSchema,
  updateUserSchema,
  userIdParamSchema,
} from '../validations/user.validation';

const router = Router();

router.get('/', userController.list);
router.get('/:id', validate({ params: userIdParamSchema }), userController.getById);
router.post('/', validate({ body: createUserSchema }), userController.create);
router.patch(
  '/:id',
  validate({ params: userIdParamSchema, body: updateUserSchema }),
  userController.update,
);
router.delete('/:id', validate({ params: userIdParamSchema }), userController.remove);

export default router;
