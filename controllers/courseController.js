const Course = require("../models/Course");

const register = async(req,res)=>{
    const {courseName,description,category,duration,originalPrice,discountedPrice} = req.body;
    try {
        const course = await Course.create({
            courseName,description,category,duration,originalPrice,discountedPrice
        })
        res.status(201).json(course);
    } catch (error) {
        res.status(500).json({message:"server error",error:error.message})
    }
}

const getallCourse = async(req,res)=>{
    try {
        const course = await Course.find();
    res.status(200).json(course);
    } catch (error) {
         const course = await Course.find();
    res.status(200).json(course);
    }
}

const updateCourse = async(req,res)=>{
    const {courseName,description,category,duration,originalPrice,discountedPrice} =req.body;
    try {
            const update = await Course.findByIdAndUpdate(req.params.id,{$set:{courseName,description,category,duration,originalPrice,discountedPrice}},{new:true});
            res.status(200).json({message:"updated successfully",update});
    } catch (error) {
        res.status(500).json({message:"server error",error:error.message})
    }
}


const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: 'Course not found' });
    res.status(200).json(course);
  } catch (error) {
    console.error('Get Course Error:', error);
    res.status(500).json({ message: 'Server error while getting course' });
  }
};

const deleteCourse = async(req,res)=>{
   try {
       const course = await Course.findByIdAndDelete(req.params.id);
       if (!course) return res.status(404).json({ message: 'Course not found' });
       res.status(200).json({ message: 'Course deleted successfully' });
     } catch (error) {
       console.error('Delete Course Error:', error);
       res.status(500).json({ message: 'Server error while deleting course' });
     }
}

const filterJob = async(req,res)=>{
    const { category } = req.query;

  try {
    let filter = {};

    if (category && category !== 'All') {
      const categoriesArray = category.split(',').map(cat => new RegExp(`^${cat}$`, 'i'));
          filter.category = { $in: categoriesArray };
    }

    const courses = await Course.find(filter);
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch courses', error: error.message });
  }
}

module.exports = {
    register,
    getallCourse,
    updateCourse,
    deleteCourse,
    getCourseById,
    filterJob
}