const Router = require('express');
const router = new Router();
const tokenController = require('../controllers/token.controllers');

router.post('/tokens', tokenController.createToken);
router.get('/tokens', tokenController.getTokensByUser);
router.put('/tokens/:id', tokenController.updateToken);
router.delete('/tokens/:id', tokenController.deleteToken);

module.exports = router;
