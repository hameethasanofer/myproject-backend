import mongoose from 'mongoose';
import dotenv from 'dotenv';
import JobRequest from '../models/JobRequest.js';
import connectDB from '../config/db.js';

dotenv.config();

connectDB();

const sampleJobs = [
  {
    title: 'Need a plumber for a leaking kitchen tap in Glasgow',
    description: 'The tap has been leaking for a few days. Needs fixing ASAP.',
    category: 'Plumbing',
    location: 'Glasgow',
    contactName: 'John Doe',
    contactEmail: 'john@example.com',
    status: 'Open'
  },
  {
    title: 'Rewire living room lights',
    description: 'Looking to install new spotlights in the living room.',
    category: 'Electrical',
    location: 'Edinburgh',
    contactName: 'Jane Smith',
    contactEmail: 'jane@example.com',
    status: 'Open'
  },
  {
    title: 'Paint exterior of 3-bedroom house',
    description: 'Full exterior painting required for a semi-detached house. Walls and window frames.',
    category: 'Painting',
    location: 'Aberdeen',
    contactName: 'Alice Johnson',
    contactEmail: 'alice@example.com',
    status: 'In Progress'
  },
  {
    title: 'Fix broken stair spindle',
    description: 'One of the wooden spindles on the staircase is broken and needs replacing.',
    category: 'Joinery',
    location: 'Dundee',
    contactName: 'Bob Williams',
    contactEmail: 'bob@example.com',
    status: 'Open'
  },
  {
    title: 'Install new kitchen sink',
    description: 'Replacing old sink with a new stainless steel one. Need plumbing connections done.',
    category: 'Plumbing',
    location: 'Stirling',
    contactName: 'Charlie Brown',
    contactEmail: 'charlie@example.com',
    status: 'Closed'
  }
];

const importData = async () => {
  try {
    await JobRequest.deleteMany();
    console.log('Jobs Collection Cleared');

    await JobRequest.insertMany(sampleJobs);
    console.log('Sample Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await JobRequest.deleteMany();
    console.log('Data Destroyed!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
