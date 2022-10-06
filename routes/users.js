import express from 'express';
import auth from '../middleware/auth.js';
import getUsers, { createUser } from '../controllers/users.js';

const router = express.Router();

router.get('/', getUsers);
router.post('/', createUser);

export default router;
