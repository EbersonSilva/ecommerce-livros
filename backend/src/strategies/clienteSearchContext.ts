import { ClienteSearchStrategy, TipoBuscaCliente } from './clienteSearchStrategy'
import { BuscaPorNomeStrategy } from './buscaPorNomeStrategy'
import { BuscaPorCpfStrategy } from './buscaPorCpfStrategy'
import { BuscaPorEmailStrategy } from './buscaPorEmailStrategy'

// Contexto para busca de clientes, utilizando o padrão Strategy
export class ClienteSearchContext {
  private strategy: ClienteSearchStrategy
// Define a estratégia de busca com base no tipo fornecido
  constructor(tipo: TipoBuscaCliente) {
    switch (tipo) {
      case 'cpf':
        this.strategy = new BuscaPorCpfStrategy()
        break
      case 'email':
        this.strategy = new BuscaPorEmailStrategy()
        break
      case 'nome':
      default:
        this.strategy = new BuscaPorNomeStrategy()
        break
    }
  }

  buscar(valor: string) {
    return this.strategy.buscar(valor)
  }
}
