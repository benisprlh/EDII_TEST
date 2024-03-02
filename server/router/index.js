const { authorization, authentication } = require('../auth');
const BiodataController = require('../controllers/biodataController');
const EducationController = require('../controllers/educationController');
const TrainingController = require('../controllers/trainingController');
const UserController = require('../controllers/userController');
const WorkController = require('../controllers/workController');

const router = require('express').Router();

router.post('/register', UserController.register)
router.post('/login', UserController.login)

router.get('/biodata', authentication, BiodataController.getBiodata);
router.post('/biodata', authentication, BiodataController.create);
router.get('/biodata/:id', authentication, authorization, BiodataController.getBiodataById)
router.put('/biodata/:id', authentication, authorization, BiodataController.update)
router.delete('/biodata/:id', authentication, authorization,  BiodataController.delete)

router.post('/education/:id', authentication, EducationController.create);
router.get('/education/:id', authentication, EducationController.getEducation);
router.put('/education/:id', authentication, EducationController.update);
router.delete('/education/:id', authentication, EducationController.delete);

router.post('/work/:id', authentication, WorkController.create);
router.get('/work/:id', authentication, WorkController.getWork);
router.put('/work/:id', authentication, WorkController.update);
router.delete('/work/:id', authentication, WorkController.delete);

router.post('/training/:id', authentication, TrainingController.create);
router.get('/training/:id', authentication, TrainingController.getTraining);
router.put('/training/:id', authentication, TrainingController.update);
router.delete('/training/:id', authentication, TrainingController.delete);


module.exports = router;