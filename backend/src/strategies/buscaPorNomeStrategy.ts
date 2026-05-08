import { ClienteRepository } from '../repositories/clienteRepository'
import { ClienteSearchStrategy } from './clienteSearchStrategy'

// Estratégia de busca por nome
export class BuscaPorNomeStrategy implements ClienteSearchStrategy {
  async buscar(valor: string) {
    return ClienteRepository.findByNome(valor)
  }
}
