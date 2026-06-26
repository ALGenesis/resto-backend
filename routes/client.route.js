import {Router} from 'express'
import {getAllClients, getClientByID, createClient, updateClientByID, deleteClientByID} from '../controllers/client.controller.js'

const router = Router()

router.get('/', getAllClients)
router.get('/:id', getClientByID)
router.post('/', createClient)
router.put('/:id', updateClientByID)
router.delete('/:id', deleteClientByID)

export default router