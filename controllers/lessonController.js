const Lesson = require('../models/Lesson');

const addLesson = async(req,res)=>{
    const {lessonName,lessonContent,file} = req.body;
    const courseId = req.params.id;

    try {
        const addLesson = await Lesson.create({
            lessonName,
            lessonContent,
            file,
            course:courseId
        })
        res.status(201).json({message:"Lesson Added Successfully",data:addLesson})
    } catch (error) {
        res.status(500).json({message:"error in adding lesson",error:error.message});
    }
}

const getLessonbyCourse=async(req,res)=>{
     try {
        const lesson = await Lesson.find(req.params.id).populate('course')
        res.status(200).json({message:"Lesson by Course",lesson});
     } catch (error) {
        res.status(500).json({message:"server error",error:error.message});
     }
}

const getAllLesson = async(req,res)=>{
    try {
    const lessons = await Lesson.find().populate('course');
    res.json(lessons);
  } catch (error) {
    res.status(500).json({ message: 'Server error',error:error.message });
  }
}

const deleteLesson = async (req, res) => {
  const { courseId, lessonId } = req.params;

  try {
    console.log(courseId,"courseId");
    console.log(lessonId,"lessonId");
    const deleted = await Lesson.findOneAndDelete({
      _id: lessonId,
      course: courseId
    });

    if (!deleted) {
      return res.status(404).json({ message: 'Lesson not found for this course' });
    }

    res.status(200).json({ message: 'Lesson deleted successfully'});
  } catch (error) {
    res.status(500).json({ message: 'Error deleting lesson', error: error.message });
  }
};

const updateLesson =async (req,res)=>{
  const {courseId,lessonId}=req.params;
  const{lessonContent,file,lessonName} = req.body
  try {
    const update = await Lesson.findByIdAndUpdate({_id:lessonId,course:courseId},{$set:{lessonName,lessonContent,file}},{new:true});
     if (!update) {
      return res.status(404).json({ message: 'Lesson not found for this course' });
    }
    res.status(200).json({message:"Lesson updated successfully",update});
  } catch (error) {
    res.status(500).json({message:"server error",error:error.message});
  }
}


module.exports = {
    addLesson,
    getLessonbyCourse,
    getAllLesson,
    deleteLesson,
    updateLesson
}