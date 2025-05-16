const express = require('express');

const router = express.Router();

const contactController = require('../controllers/contacts')


router.get('/', contactController.getAll);

router.get('/:id', contactController.getSingle);

router.post('/', contactController.createUser);

router.put('/:id', contactController.updateUser);

router.delete('/:id', contactController.deleteUser);

module.exports = router;