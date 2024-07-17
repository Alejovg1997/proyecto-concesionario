const express = require('express');
const router = express.Router();
const almacenController = require('../controllers/almacenController');

router.get('/', almacenController.getAlmacenes);
router.get('/:id', almacenController.getAlmacenById);
router.post('/', almacenController.createAlmacen);
router.put('/:id', almacenController.updateAlmacen);
router.delete('/:id', almacenController.deleteAlmacen);

module.exports = router;
