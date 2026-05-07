export type StatusCliente = 'ATIVO' | 'INATIVO' | 'SUSPENSO'

export interface Endereco {
  id: string
  nomeEndereco: string // ex: "Casa", "Trabalho"
  tipoEndereco: 'COBRANCA' | 'ENTREGA'
  tipoResidencia?: string // ex: "Apartamento", "Casa", "Comercial"
  tipoLogradouro?: string // ex: "Rua", "Avenida", "Travessa"
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
  codigoSeguranca?: string // CVV
  preferencial?: boolean
}

export interface Transacao {
  id: string
  data: string
  valor: number
  status: string // ex: "APROVADA", "RECUSADA", "PENDENTE"
}

export interface Cliente {
  id: string
  codigoCliente: string // código único para cada cliente, pode ser gerado automaticamente
  nome: string
  genero?: string
  dtNasc?: string
  cpf?: string
  tipoTelefone?: string // ex: "CELULAR", "RESIDENCIAL", "COMERCIAL"
  ddd?: string
  numeroTelefone?: string
  email?: string
  senha?: string
  status: StatusCliente // ATIVO, INATIVO, SUSPENSO
  ranking?: number
  enderecos: Endereco[] // um cliente deve ter ao menos um endereço
  cartoes?: CartaoCredito[] // um cliente pode ter zero ou mais cartões de crédito
  transacoes?: Transacao[] // histórico de transações do cliente
}
