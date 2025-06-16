const express = require('express');
const { addLesson, getLessonbyCourse, getAllLesson, deleteLesson, updateLesson } = require('../controllers/lessonController');
const { authMiddleware, isAdmin } = require('../middleware/authMiddleware');
const router = express.Router();


router.post('/add/:id',authMiddleware,isAdmin,addLesson);
router.get('/course/:courseId',getLessonbyCourse);
router.get('/getAll', getAllLesson);
router.put('/update/:courseId/:lessonId',authMiddleware,isAdmin, updateLesson);
router.delete('/delete/:courseId/:lessonId',authMiddleware,isAdmin, deleteLesson);

module.exports = router;