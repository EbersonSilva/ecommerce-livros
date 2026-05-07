import { Request, Response } from 'express'
import { ClienteService } from '../services/clienteService'

export const ClienteController = {
  
  criar: (req: Request, res: Response) => {
    try {
      const c = ClienteService.criar(req.body)
      res.status(201).json(c)
    } catch (err: any) {
      res.status(400).json({ error: err.message })
    }
  },

  listar: (req: Request, res: Response) => {
    const { q, status } = req.query
    const r = ClienteService.listar(q as string, status as string)
    res.json({ data: r })
  },

  buscar: (req: Request, res: Response) => {
    const { id } = req.params
    const c = ClienteService.buscarPorId(id)
    if (!c) return res.status(404).json({ error: 'Cliente não encontrado' })
    res.json(c)
  },

  atualizar: (req: Request, res: Response) => {
    const { id } = req.params
    const c = ClienteService.atualizar(id, req.body)
    if (!c) return res.status(404).json({ error: 'Cliente não encontrado' })
    res.json(c)
  },

  inativar: (req: Request, res: Response) => {
    const { id } = req.params
    const c = ClienteService.inativar(id)
    if (!c) return res.status(404).json({ error: 'Cliente não encontrado' })
    res.json(c)
  }
}
