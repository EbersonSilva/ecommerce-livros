import { Router } from 'express'
import { ClienteController } from '../controllers/clienteController'

const router = Router()

router.get('/', ClienteController.listar) // permite filtrar por nome, cpf/email (q) e status (ATIVO, INATIVO, SUSPENSO)
router.post('/', ClienteController.criar) // cria um novo cliente, exigindo nome e pelo menos um endereço
router.get('/:id', ClienteController.buscar) // busca um cliente pelo ID, retornando 404 se não encontrado
router.put('/:id', ClienteController.atualizar) // atualiza os dados de um cliente, permitindo modificar qualquer campo, retornando 404 se não encontrado
router.patch('/:id/inativar', ClienteController.inativar) // inativa um cliente, alterando seu status para INATIVO, retornando 404 se não encontrado

export default router
