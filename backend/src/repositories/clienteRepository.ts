import prisma from '../prisma/client'
import { Cliente } from '../models/Cliente'

export const ClienteRepository = {
  create: async (data: Partial<Cliente>): Promise<Cliente> => {
    const enderecosData = data.enderecos?.map(e => ({
      nomeEndereco: e.nomeEndereco,
      tipoEndereco: e.tipoEndereco,
      tipoResidencia: e.tipoResidencia,
      tipoLogradouro: e.tipoLogradouro,
      logradouro: e.logradouro,
      numero: e.numero,
      bairro: e.bairro,
      cep: e.cep,
      cidade: e.cidade,
      estado: e.estado,
      pais: e.pais,
      observacao: e.observacao,
    })) || []

    return prisma.cliente.create({
      data: {
        nome: data.nome || '',
        codigoCliente: data.codigoCliente,
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
        enderecos: { create: enderecosData }
      },
      include: { enderecos: true, cartoes: true, transacoes: true }
    })
  },

  findAll: async (query?: { q?: string; status?: string }): Promise<Cliente[]> => {
    const where: any = {}
    
    if (query?.q) {
      where.OR = [
        { nome: { contains: query.q, mode: 'insensitive' } },
        { cpf: { contains: query.q } },
        { email: { contains: query.q, mode: 'insensitive' } }
      ]
    }
    
    if (query?.status) {
      where.status = query.status
    }

    return prisma.cliente.findMany({
      where,
      include: { enderecos: true, cartoes: true, transacoes: true }
    })
  },

  findById: async (id: string): Promise<Cliente | null> => {
    return prisma.cliente.findUnique({
      where: { id },
      include: { enderecos: true, cartoes: true, transacoes: true }
    })
  },

  update: async (id: string, patch: Partial<Cliente>): Promise<Cliente | null> => {
    return prisma.cliente.update({
      where: { id },
      data: patch,
      include: { enderecos: true, cartoes: true, transacoes: true }
    })
  },

  inactivate: async (id: string): Promise<Cliente | null> => {
    return prisma.cliente.update({
      where: { id },
      data: { status: 'INATIVO' },
      include: { enderecos: true, cartoes: true, transacoes: true }
    })
  }
}