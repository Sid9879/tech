const express = require('express');
const { authMiddleware, isAdmin } = require('../../../TechBin/server/middleware/token');
const { register, getallCourse, updateCourse, getCourseById, deleteCourse, filterJob } = require('../controllers/courseController');
const router = express.Router();


router.get('/getAll',authMiddleware, getallCourse);
router.get('/getSingle/:id', authMiddleware,getCourseById);
router.get('/filter', authMiddleware,filterJob);

router.post('/registercourse', authMiddleware, isAdmin, register);
router.put('/updatecourse/:id', authMiddleware, isAdmin, updateCourse);
router.delete('/deletecourse/:id', authMiddleware, isAdmin, deleteCourse);

module.exports = router