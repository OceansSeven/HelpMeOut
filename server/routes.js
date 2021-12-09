const router = require('express').Router();
const { route } = require('.');
const controller = require('./controllers');

// Connect controller methods to their corresponding routes

// Example
router.get('/users', controller.users.get);
router.post('/users', controller.users.post);
router.put('/users', controller.users.put);

module.exports = router;