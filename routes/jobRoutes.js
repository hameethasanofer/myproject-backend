import express from 'express';
import { body } from 'express-validator';
import {
  getJobs,
  getJob,
  createJob,
  updateJobStatus,
  deleteJob
} from '../controllers/jobController.js';

const router = express.Router();


const validateJobCreation = [
  body('title').notEmpty().withMessage('Title is required'),
  body('description').notEmpty().withMessage('Description is required'),
  body('location').notEmpty().withMessage('Location is required'),
  body('contactEmail').optional({ checkFalsy: true }).isEmail().withMessage('Please provide a valid email')
];

router.route('/')
  .get(getJobs)
  .post(validateJobCreation, createJob);

router.route('/:id')
  .get(getJob)
  .patch(updateJobStatus)
  .delete(deleteJob);

export default router;
