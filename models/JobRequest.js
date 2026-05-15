import mongoose from 'mongoose';

const jobRequestSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title'],
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
  },
  category: {
    type: String,
    enum: ['Plumbing', 'Electrical', 'Painting', 'Joinery', 'Other'],
    default: 'Other'
  },
  location: {
    type: String,
    required: [true, 'Please add a location']
  },
  contactName: {
    type: String,
  },
  contactEmail: {
    type: String,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email'
    ]
  },
  status: {
    type: String,
    enum: ['Open', 'In Progress', 'Closed'],
    default: 'Open'
  }
}, {
  timestamps: true 
});

const JobRequest = mongoose.model('JobRequest', jobRequestSchema);

export default JobRequest;
