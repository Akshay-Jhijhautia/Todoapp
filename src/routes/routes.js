const express = require('express');
const router = express.Router();

const controller = require('../controllers/controller')

router.get('/', controller.getToDoList);
router.get('/:id', controller.getOnelist);
router.post('/',controller.createNewTodo);
router.put('/:id',controller.updateATodo);
router.delete('/:id',controller.deleteOneTodo);



module.exports = router;