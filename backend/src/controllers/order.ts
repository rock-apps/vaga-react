import { Request, Response } from 'express';
import db from '../database/connection';

class Order {
  public async create(req: Request, res: Response): Promise<Response> {
	  const { id, products } = req.body;
	  
	  const [account] = await db('users').select('*').where('users.id', '=', id);
	  if (!account) return res.jsonBadRequest({ message: 'Ocorreu um erro ao criar seu pedido, recarregue a página ou entre mais tarde.' });
	  
	  return res.jsonOk({ account, products });
  }
}

export default new Order();
