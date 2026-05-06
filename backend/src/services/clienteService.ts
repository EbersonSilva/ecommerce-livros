import { Cliente } from '../models/Cliente'
import { ClienteRepository } from '../repositories/clienteRepository'

export const ClienteService = {
  criar: (data: Partial<Cliente>): Cliente => {
    if (!data.nome) throw new Error('Nome é obrigatório')
    if (!data.enderecos || data.enderecos.length === 0) throw new Error('Cliente precisa ter ao menos um endereço')
    // regras adicionais: validação de CPF, senha forte etc. podem ser adicionadas aqui
    return ClienteRepository.create(data)
  },

  listar: (q?: string, status?: string) => {
    return ClienteRepository.findAll({ q, status })
  },

  buscarPorId: (id: string) => {
    return ClienteRepository.findById(id)
  },

  atualizar: (id: string, patch: Partial<Cliente>) => {
    return ClienteRepository.update(id, patch)
  },

  inativar: (id: string) => {
    return ClienteRepository.inactivate(id)
  }
}
