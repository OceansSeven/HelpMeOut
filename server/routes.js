const router = require("express").Router();
const controller = require("./controllers");

// Connect controller methods to their corresponding routes

router.get("/user/:user_id", controller.user.getUser);
router.post("/user", controller.user.postUser);
router.put("/user", controller.user.editUser);

router.get("/messages/all/:id", controller.messages.getUserMessages);
router.get("/messages/", controller.messages.getMessages);
router.post("/messages/", controller.messages.postMessage);

router.get("/contractors", controller.contractors.getContractors);

router.get('/jobs', controller.jobs.getJobs);
router.post('/jobs', controller.jobs.postJobs);
router.put('/jobs', controller.jobs.putJobs);

router.post("/reviews", controller.reviews.postReview);

router.post("/login", controller.login.authenticateUser);
router.get("/logout", controller.login.logOutUser);
router.post("/register", controller.register.registerUser);
router.post("/v1/text-mail", controller.nodemail.sendMail);

router.get("/logged-in-user", controller.login.getLoggedInUser);

module.exports = router;
