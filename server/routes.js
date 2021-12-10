const router = require('express').Router();
const controller = require('./controllers');

// Connect controller methods to their corresponding routes

router.get('/user/:user_id', controller.user.getUser);
router.post('/user', controller.user.postUser);
router.put('/user', controller.user.editUser);

router.get('/messages/:user_id', controller.messages.getMessages);
router.post('/messages/:user_id', controller.messages.postMessage);

router.get('/contractors', controller.contractors.getContractors);

router.get('/jobs', controller.jobs.getJobs);
router.post('/jobs', controller.jobs.postJobs);

router.post('/login', controller.login.authenticateUser);
router.post('/register', controller.register.registerUser);
router.post('/v1/text-mail', controller.nodemail.sendMail);


module.exports = router;
