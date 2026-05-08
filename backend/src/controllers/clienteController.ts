import { Request, Response } from 'express'
import { ClienteService } from '../services/clienteService'

export const ClienteController = {
  criar: async (req: Request, res: Response) => {
    try {
      const c = await ClienteService.criar(req.body)
      res.status(201).json(c)
    } catch (err: any) {
      res.status(400).json({ error: err.message })
    }
  },

  listar: async (req: Request, res: Response) => {
    const { q, status } = req.query
    const r = await ClienteService.listar(q as string, status as string)
    res.json({ data: r })
  },

  consultar: async (req: Request, res: Response) => {
    const { tipo, valor } = req.query

    if (!tipo || !valor || typeof tipo !== 'string' || typeof valor !== 'string') {
      return res.status(400).json({ error: 'Informe tipo e valor da busca' })
    }

    const r = await ClienteService.consultarPor(tipo as 'nome' | 'cpf' | 'email', valor)
    res.json({ data: r })
  },

  buscar: async (req: Request, res: Response) => {
    const { id } = req.params
    const c = await ClienteService.buscarPorId(id)
    if (!c) return res.status(404).json({ error: 'Cliente não encontrado' })
    res.json(c)
  },

  atualizar: async (req: Request, res: Response) => {
    const { id } = req.params
    const c = await ClienteService.atualizar(id, req.body)
    if (!c) return res.status(404).json({ error: 'Cliente não encontrado' })
    res.json(c)
  },

  inativar: async (req: Request, res: Response) => {
    const { id } = req.params
    const c = await ClienteService.inativar(id)
    if (!c) return res.status(404).json({ error: 'Cliente não encontrado' })
    res.json(c)
  }
}