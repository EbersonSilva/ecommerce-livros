import { ClienteRepository } from '../repositories/clienteRepository'
import { ClienteSearchStrategy } from './clienteSearchStrategy'

// Estratégia de busca por email
export class BuscaPorEmailStrategy implements ClienteSearchStrategy {
  async buscar(valor: string) {
    return ClienteRepository.findByEmail(valor)
  }
}
