import express, { Router } from 'express';
import { incorrectRoute } from '../shared/middlewares/incorrect-route.middleware';
import { catchErrors } from '../shared/middlewares/catch-errors.middleware';
import { auth } from './auth/auth.routes';
import { transaction } from './transaction/transaction.routes';
import { verifyJWT } from '../shared/middlewares/jwt-verify.middleware';
import { user } from './user/user.routes';
import { finance } from './finance/finance.routes';

const router = Router();

router.use(express.json());

router.use('/auth', auth);
router.use('/transaction', verifyJWT, transaction);
router.use('/user', verifyJWT, user);
router.use('/finance', verifyJWT, finance);

router.use('*', incorrectRoute);
router.use(catchErrors);

export { router };
