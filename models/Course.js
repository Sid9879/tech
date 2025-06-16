const mongoose = require('mongoose');
const courseSchema = mongoose.Schema(
  {
    courseName: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      // required: true,
    },
    category: {
      type: String,
      required: true,
      enum: ['Math', 'EVS', 'Science', 'Geography', 'Other'],
    },

    duration: {
      type: String,
    },
    originalPrice: {
      type: Number,
      min: 0,
      required:true
    },
    discountedPrice: {
      type: Number,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("course",courseSchema)
