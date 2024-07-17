const express = require('express');
const router = express.Router();
const insumoController = require('../controllers/insumoController');

router.get('/', insumoController.getInsumos);
router.get('/:id', insumoController.getInsumoById);
router.post('/', insumoController.createInsumo);
router.put('/:id', insumoController.updateInsumo);
router.delete('/:id', insumoController.deleteInsumo);

module.exports = router;
