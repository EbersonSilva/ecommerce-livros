export type StatusCliente = 'ATIVO' | 'INATIVO' | 'SUSPENSO'

export interface Endereco {
  id: string
  nomeEndereco: string
  tipoEndereco: 'COBRANCA' | 'ENTREGA'
  tipoResidencia?: string
  tipoLogradouro?: string
  logradouro?: string
  numero?: string
  bairro?: string
  cep?: string
  cidade?: string
  estado?: string
  pais?: string
  observacao?: string
}

export interface CartaoCredito {
  id: string
  numeroCartao: string
  nomeImpresso: string
  bandeira?: string
  codigoSeguranca?: string
  preferencial?: boolean
}

export interface Transacao {
  id: string
  data: string
  valor: number
  status: string
}

export interface Cliente {
  id: string
  codigoCliente: string
  nome: string
  genero?: string
  dtNasc?: string
  cpf?: string
  tipoTelefone?: string
  ddd?: string
  numeroTelefone?: string
  email?: string
  senha?: string
  status: StatusCliente
  ranking?: number
  enderecos: Endereco[]
  cartoes?: CartaoCredito[]
  transacoes?: Transacao[]
}
