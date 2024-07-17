const express = require('express');
const router = express.Router();
const {
    getDetallesVenta,
    getDetalleVentaById,
    createDetalleVenta,
    updateDetalleVenta,
    deleteDetalleVenta
} = require('../controllers/detalleVentaController');

router.get('/', getDetallesVenta);
router.get('/:id', getDetalleVentaById);
router.post('/', createDetalleVenta);
router.put('/:id', updateDetalleVenta);
router.delete('/:id', deleteDetalleVenta);

module.exports = router;
