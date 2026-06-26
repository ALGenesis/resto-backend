import {Router}  from 'express'
import { getAllPlats, getPlatByID, createPlat, updatePlatByID, deletePlatByID } from '../controllers/plat.controller.js'

const router = Router()

router.get('/', getAllPlats)
router.get('/:id', getPlatByID)
router.post('/create', createPlat)
router.put('/update/:id', updatePlatByID)
router.delete('/delete/:id', deletePlatByID)    

export default router