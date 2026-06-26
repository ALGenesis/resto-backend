import {Router}  from 'express'
import { getAllRestos, getRestoByID, createResto, updateRestoByID, deleteRestoByID } from '../controllers/resto.controller.js'
const router = Router()

router.get('/', getAllRestos)
router.get('/:id', getRestoByID)
router.post('/create', createResto)
router.put('/update/:id', updateRestoByID)
router.delete('/delete/:id', deleteRestoByID)


export default router