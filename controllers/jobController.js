import JobRequest from '../models/JobRequest.js';
import { validationResult } from 'express-validator';

// @desc    Get all job requests
// @route   GET /api/jobs
// @access  Public
export const getJobs = async (req, res, next) => {
  try {
    const { category, status, search } = req.query;
    

    let query = {};
    
    if (category) {
      query.category = category;
    }
    
    if (status) {
      query.status = status;
    }
    
    
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    const jobs = await JobRequest.find(query).sort({ createdAt: -1 });
    res.status(200).json(jobs);
  } catch (error) {
    next(error);
  }
};

// @desc    Get single job request
// @route   GET /api/jobs/:id
// @access  Public
export const getJob = async (req, res, next) => {
  try {
    const job = await JobRequest.findById(req.params.id);
    
    if (!job) {
      res.status(404);
      throw new Error('Job request not found');
    }
    
    res.status(200).json(job);
  } catch (error) {
    next(error);
  }
};

// @desc    Create new job request
// @route   POST /api/jobs
// @access  Public
export const createJob = async (req, res, next) => {
  try {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400);
      throw new Error(errors.array().map(e => e.msg).join(', '));
    }

    const job = await JobRequest.create(req.body);
    res.status(201).json(job);
  } catch (error) {
    next(error);
  }
};

// @desc    Update job request status
// @route   PATCH /api/jobs/:id
// @access  Public
export const updateJobStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    
    if (!status) {
      res.status(400);
      throw new Error('Please provide a status');
    }
    
    const validStatuses = ['Open', 'In Progress', 'Closed'];
    if (!validStatuses.includes(status)) {
      res.status(400);
      throw new Error('Invalid status value');
    }

    let job = await JobRequest.findById(req.params.id);
    
    if (!job) {
      res.status(404);
      throw new Error('Job request not found');
    }
    
    job.status = status;
    await job.save();
    
    res.status(200).json(job);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete job request
// @route   DELETE /api/jobs/:id
// @access  Public
export const deleteJob = async (req, res, next) => {
  try {
    const job = await JobRequest.findById(req.params.id);
    
    if (!job) {
      res.status(404);
      throw new Error('Job request not found');
    }
    
    await job.deleteOne();
    
    res.status(200).json({ message: 'Job request removed' });
  } catch (error) {
    next(error);
  }
};
