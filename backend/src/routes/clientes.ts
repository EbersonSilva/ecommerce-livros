import { Router } from 'express'
import { ClienteController } from '../controllers/clienteController'

const router = Router()

router.get('/', ClienteController.listar)
router.post('/', ClienteController.criar)
router.get('/:id', ClienteController.buscar)
router.put('/:id', ClienteController.atualizar)
router.patch('/:id/inativar', ClienteController.inativar)

export default router
