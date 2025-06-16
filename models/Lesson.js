const mongoose = require ('mongoose');
const lessonSchema = mongoose.Schema(
  {
    course: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'course',
    },
    lessonName: {
      type: String,
      required: true,
    },
    lessonContent: {
      type: String,
      required: true,
    },
    file:[] //video add krne k liye
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("lesson",lessonSchema)
