import { Cliente } from '../models/Cliente'
import { ClienteRepository } from '../repositories/clienteRepository'

export const ClienteService = {
  //Cria um novo cliente, realizando validações básicas como nome obrigatório e pelo menos um endereço
  criar: (data: Partial<Cliente>): Cliente => { 
    if (!data.nome) throw new Error('Nome é obrigatório')   
    if (!data.enderecos || data.enderecos.length === 0) throw new Error('Cliente precisa ter ao menos um endereço')
    // regras adicionais: validação de CPF, senha forte etc. podem ser adicionadas aqui
    return ClienteRepository.create(data) 
  },

  //Faz a busca de clientes, podendo filtrar por nome, cpf ou email (parâmetro q) e por status (ATIVO, INATIVO, SUSPENSO)
  listar: (q?: string, status?: string) => {
    return ClienteRepository.findAll({ q, status }) 
  },
  //Busca um cliente pelo ID
  buscarPorId: (id: string) => {
    return ClienteRepository.findById(id)
  },
  //Atualiza os dados de um cliente, permitindo modificar qualquer campo
  atualizar: (id: string, patch: Partial<Cliente>) => {
    return ClienteRepository.update(id, patch)
  },
  //Inativa um cliente, alterando seu status para INATIVO
  inativar: (id: string) => {
    return ClienteRepository.inactivate(id)
  }
}
