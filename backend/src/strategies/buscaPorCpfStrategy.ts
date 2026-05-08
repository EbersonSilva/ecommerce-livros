import { ClienteRepository } from '../repositories/clienteRepository'
import { ClienteSearchStrategy } from './clienteSearchStrategy'

/// Estratégia de busca por CPF
export class BuscaPorCpfStrategy implements ClienteSearchStrategy {
  async buscar(valor: string) {
    return ClienteRepository.findByCpf(valor)
  }
}
