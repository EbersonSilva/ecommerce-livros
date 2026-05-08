import prisma from '../prisma/client'
import { CartaoCredito, Cliente, Endereco, Transacao } from '../models/Cliente'

type PrismaClienteComRelacoes = {
  id: string
  codigoCliente: string
  nome: string
  genero: string | null
  dtNasc: string | null
  cpf: string | null
  tipoTelefone: string | null
  ddd: string | null
  numeroTelefone: string | null
  email: string | null
  senha: string | null
  status: string
  ranking: number | null
  enderecos?: Array<{
    id: string
    nomeEndereco: string
    tipoEndereco: string
    tipoResidencia: string | null
    tipoLogradouro: string | null
    logradouro: string | null
    numero: string | null
    bairro: string | null
    cep: string | null
    cidade: string | null
    estado: string | null
    pais: string | null
    observacao: string | null
  }>
  cartoes?: Array<{
    id: string
    numeroCartao: string
    nomeImpresso: string
    bandeira: string | null
    codigoSeguranca: string | null
    preferencial: boolean | null
  }>
  transacoes?: Array<{
    id: string
    data: string
    valor: number
    status: string
  }>
}

function mapEndereco(endereco: NonNullable<PrismaClienteComRelacoes['enderecos']>[number]): Endereco {
  return {
    id: endereco.id,
    nomeEndereco: endereco.nomeEndereco,
    tipoEndereco: endereco.tipoEndereco as 'COBRANCA' | 'ENTREGA',
    tipoResidencia: endereco.tipoResidencia || undefined,
    tipoLogradouro: endereco.tipoLogradouro || undefined,
    logradouro: endereco.logradouro || undefined,
    numero: endereco.numero || undefined,
    bairro: endereco.bairro || undefined,
    cep: endereco.cep || undefined,
    cidade: endereco.cidade || undefined,
    estado: endereco.estado || undefined,
    pais: endereco.pais || undefined,
    observacao: endereco.observacao || undefined,
  }
}

function mapCartao(cartao: NonNullable<PrismaClienteComRelacoes['cartoes']>[number]): CartaoCredito {
  return {
    id: cartao.id,
    numeroCartao: cartao.numeroCartao,
    nomeImpresso: cartao.nomeImpresso,
    bandeira: cartao.bandeira || undefined,
    codigoSeguranca: cartao.codigoSeguranca || undefined,
    preferencial: cartao.preferencial || false,
  }
}

function mapTransacao(transacao: NonNullable<PrismaClienteComRelacoes['transacoes']>[number]): Transacao {
  return {
    id: transacao.id,
    data: transacao.data,
    valor: transacao.valor,
    status: transacao.status,
  }
}

function mapCliente(cliente: PrismaClienteComRelacoes): Cliente {
  return {
    id: cliente.id,
    codigoCliente: cliente.codigoCliente,
    nome: cliente.nome,
    genero: cliente.genero || undefined,
    dtNasc: cliente.dtNasc || undefined,
    cpf: cliente.cpf || undefined,
    tipoTelefone: cliente.tipoTelefone || undefined,
    ddd: cliente.ddd || undefined,
    numeroTelefone: cliente.numeroTelefone || undefined,
    email: cliente.email || undefined,
    senha: cliente.senha || undefined,
    status: cliente.status as Cliente['status'],
    ranking: cliente.ranking || 0,
    enderecos: (cliente.enderecos || []).map(mapEndereco),
    cartoes: (cliente.cartoes || []).map(mapCartao),
    transacoes: (cliente.transacoes || []).map(mapTransacao),
  }
}

function clienteScalarPatch(patch: Partial<Cliente>) {
  return {
    nome: patch.nome,
    codigoCliente: patch.codigoCliente,
    genero: patch.genero,
    dtNasc: patch.dtNasc,
    cpf: patch.cpf,
    tipoTelefone: patch.tipoTelefone,
    ddd: patch.ddd,
    numeroTelefone: patch.numeroTelefone,
    email: patch.email,
    senha: patch.senha,
    status: patch.status,
    ranking: patch.ranking,
  }
}

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

    const cliente = await prisma.cliente.create({
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

    return mapCliente(cliente as PrismaClienteComRelacoes)
  },

  findAll: async (query?: { q?: string; status?: string }): Promise<Cliente[]> => {
    const where: any = {}
    
    if (query?.q) {
      where.OR = [
        { nome: { contains: query.q } }, 
        { cpf: { contains: query.q } },
        { email: { contains: query.q } }
      ]
    }
    
    if (query?.status) {
      where.status = query.status
    }

    const clientes = await prisma.cliente.findMany({
      where,
      include: { enderecos: true, cartoes: true, transacoes: true }
    })

    return clientes.map(cliente => mapCliente(cliente as PrismaClienteComRelacoes))
  },

  findByNome: async (nome: string): Promise<Cliente[]> => {
    const clientes = await prisma.cliente.findMany({
      where: {
        nome: {
          contains: nome
        }
      },
      include: { enderecos: true, cartoes: true, transacoes: true }
    })

    return clientes.map(cliente => mapCliente(cliente as PrismaClienteComRelacoes))
  },

  findByCpf: async (cpf: string): Promise<Cliente[]> => {
    const clientes = await prisma.cliente.findMany({
      where: {
        cpf: {
          contains: cpf
        }
      },
      include: { enderecos: true, cartoes: true, transacoes: true }
    })

    return clientes.map(cliente => mapCliente(cliente as PrismaClienteComRelacoes))
  },

  findByEmail: async (email: string): Promise<Cliente[]> => {
    const clientes = await prisma.cliente.findMany({
      where: {
        email: {
          contains: email
        }
      },
      include: { enderecos: true, cartoes: true, transacoes: true }
    })

    return clientes.map(cliente => mapCliente(cliente as PrismaClienteComRelacoes))
  },

  findById: async (id: string): Promise<Cliente | null> => {
    const cliente = await prisma.cliente.findUnique({
      where: { id },
      include: { enderecos: true, cartoes: true, transacoes: true }
    })

    return cliente ? mapCliente(cliente as PrismaClienteComRelacoes) : null
  },

  update: async (id: string, patch: Partial<Cliente>): Promise<Cliente | null> => {
    const cliente = await prisma.cliente.update({
      where: { id },
      data: clienteScalarPatch(patch),
      include: { enderecos: true, cartoes: true, transacoes: true }
    })

    return mapCliente(cliente as PrismaClienteComRelacoes)
  },

  inactivate: async (id: string): Promise<Cliente | null> => {
    const cliente = await prisma.cliente.update({
      where: { id },
      data: { status: 'INATIVO' },
      include: { enderecos: true, cartoes: true, transacoes: true }
    })

    return mapCliente(cliente as PrismaClienteComRelacoes)
  }
}