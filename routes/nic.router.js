import express from 'express';
import { checkNIC } from '../controllers/nic.controller.js';
const router = express.Router();

router.post('/',checkNIC)

export default router;