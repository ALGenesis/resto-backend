import {Router} from 'express';

const router = Router();

router.get('/', getAllPersonnel);
router.get('/:id', getAllPersonnelByID)
router.post('/', createPersonnel)
router.put('/:id', updatePersonnelByID)
router.delete('/:id', deletePersonnelByID)

export default router;