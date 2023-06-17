const Router = require('express');
const router = new Router();
const controller = require('../controllers/userController');
const { check } = require('express-validator');

router.post(
  '/users',
  [
    check('name', "Ім'я не може бути порожнім").notEmpty(),
    check('name', "Ім'я повинно містити мінімум 3 символи").isLength({
      min: 3,
    }),
  ],
  controller.createUser
);
router.get('/users', controller.getUsers);
router.get('/users/:id', controller.getOneUser);
router.put('/users/:id', controller.updateUser);
router.delete('/users/:id', controller.deleteUser);

module.exports = router;
