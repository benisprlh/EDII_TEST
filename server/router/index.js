const { authorization } = require('../auth');
const BiodataController = require('../controllers/biodataController');
const EducationController = require('../controllers/educationController');
const TrainingController = require('../controllers/trainingController');
const UserController = require('../controllers/userController');
const WorkController = require('../controllers/workController');

const router = require('express').Router();

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.get('/biodata', authorization BiodataController.getBiodata);
router.post('/biodata', BiodataController.create);
router.get('/biodata/:id', BiodataController.getBiodataById)
router.put('/biodata/:id', BiodataController.update)
router.delete('/biodata/:id', BiodataController.delete)
router.post('/education/:id', EducationController.create);
router.put('/education/:id', EducationController.update);
router.delete('/education/:id', EducationController.delete);
router.post('/work/:id', WorkController.create);
router.put('/work/:id', WorkController.update);
router.delete('/work/:id', WorkController.delete);
router.post('/training/:id', TrainingController.create);
router.put('/training/:id', TrainingController.update);
router.delete('/training/:id', TrainingController.delete);


module.exports = router;