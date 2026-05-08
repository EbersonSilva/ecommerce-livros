import { Cliente } from '../models/Cliente'
// Tipo de busca para clientes (nome, cpf, email)
export type TipoBuscaCliente = 'nome' | 'cpf' | 'email'
 // Interface para as estratégias de busca de clientes
export interface ClienteSearchStrategy {
  buscar(valor: string): Promise<Cliente[]>
}
