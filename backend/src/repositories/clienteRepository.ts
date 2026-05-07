import { Cliente } from '../models/Cliente'
import { v4 as uuid } from 'uuid'

const clientes: Cliente[] = []

export const ClienteRepository = {
  //Cria um novo cliente, gerando um ID único e preenchendo os campos obrigatórios
  create: (data: Partial<Cliente>): Cliente => {
    const novo: Cliente = {
      id: uuid(),
      codigoCliente: data.codigoCliente || uuid(),
      nome: data.nome || '',
      genero: data.genero,
      dtNasc: data.dtNasc,
      cpf: data.cpf,
      tipoTelefone: data.tipoTelefone,
      ddd: data.ddd,
      numeroTelefone: data.numeroTelefone,
      email: data.email,
      senha: data.senha,
      status: data.status || 'ATIVO',
      ranking: data.ranking || 0,
      enderecos: data.enderecos && data.enderecos.length ? data.enderecos : [],
      cartoes: data.cartoes || [],
      transacoes: data.transacoes || []
    }
    clientes.push(novo)
    return novo
  },

  //Busca todos os clientes, podendo filtrar por nome, cpf ou email (parâmetro q) e por status (ATIVO, INATIVO, SUSPENSO)
  findAll: (query?: { q?: string; status?: string }): Cliente[] => {
    let r = clientes.slice()
    if (query?.q) {
      const q = query.q.toLowerCase()
      r = r.filter(c => c.nome.toLowerCase().includes(q) || (c.cpf||'').includes(q) || (c.email||'').toLowerCase().includes(q))
    }
    if (query?.status) {
      r = r.filter(c => c.status === query.status)
    }
    return r
  },
  
  findById: (id: string): Cliente | undefined => {
    return clientes.find(c => c.id === id)
  },

  update: (id: string, patch: Partial<Cliente>): Cliente | undefined => {
    const idx = clientes.findIndex(c => c.id === id)
    if (idx === -1) return undefined
    clientes[idx] = { ...clientes[idx], ...patch }
    return clientes[idx]
  },

  inactivate: (id: string): Cliente | undefined => {
    return ClienteRepository.update(id, { status: 'INATIVO' })
  }
}
