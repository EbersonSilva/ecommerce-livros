import { Cliente } from '../models/Cliente'
import { ClienteRepository } from '../repositories/clienteRepository'
import { ClienteSearchContext } from '../strategies/clienteSearchContext'
import { TipoBuscaCliente } from '../strategies/clienteSearchStrategy'

export const ClienteService = {
  criar: async (data: Partial<Cliente>): Promise<Cliente> => {
    if (!data.nome) throw new Error('Nome é obrigatório')
    if (!data.enderecos || data.enderecos.length === 0) throw new Error('Cliente precisa ter ao menos um endereço')
    return await ClienteRepository.create(data)
  },

  listar: async (q?: string, status?: string): Promise<Cliente[]> => {
    return await ClienteRepository.findAll({ q, status })
  },

  consultarPor: async (tipo: TipoBuscaCliente, valor: string): Promise<Cliente[]> => {
    const context = new ClienteSearchContext(tipo)
    return await context.buscar(valor)
  },

  buscarPorId: async (id: string): Promise<Cliente | null> => {
    return await ClienteRepository.findById(id)
  },

  atualizar: async (id: string, patch: Partial<Cliente>): Promise<Cliente | null> => {
    return await ClienteRepository.update(id, patch)
  },

  inativar: async (id: string): Promise<Cliente | null> => {
    return await ClienteRepository.inactivate(id)
  }
}