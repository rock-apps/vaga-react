import { Request, Response } from 'express';

import ProductFilter from './filter';
import JSONdb from '../../../products.json';
import getPage from '../../utils/getPage';
import db from '../../database/connection';

class Product {
  public index(req: Request, res: Response): Response {
    const { page, offset } = req.query;
    return res.jsonOk(getPage(page, offset, JSONdb.products));
  }

  public async item(req: Request, res: Response): Promise<Response> {
    const { query, params } = req;
    const { filter } = params;

    if (!('value' in query) || !(filter in ProductFilter))
      return res.jsonBadRequest({ message: 'Filtro inválido' });

    try {
      const filterHandler = ProductFilter[filter];
      return res.jsonOk(await filterHandler(query.value));
    } catch (err) {
      return res.jsonServerError();
    }
  }

  public async rating(req: Request, res: Response): Promise<Response> {
    const { rate, comment, product_id, user_id } = req.body;

    try {
      const [ratingId] = await db('rate').insert({
        rate,
        product_id,
        user_id,
        comment,
      });

      if (!ratingId)
        return res.jsonBadRequest({
          message: 'Não foi possível criar um comentário',
        });

      {
        const comment = await db('rate')
          .where('rate.id', '=', ratingId)
          .join('users', 'rate.user_id', '=', user_id)
          .select('rate.*', 'users.name', 'users.avatar');

        res.jsonOk({ comment });
      }
    } catch {
      res.jsonServerError();
    }
  }
}

export default new Product();
