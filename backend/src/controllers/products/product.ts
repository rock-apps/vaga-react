import { Request, Response } from 'express';

import ProductFilter from './filter';
import JSONdb from '../../products.json';
import getPage from '../../utils/getPage';
import db from '../../database/connection';

const ITEMS_FOR_PAGE = 5;
const COMMENTS_SELECT = [
	'rating.comment',
    'rating.rate',
    'rating.id',
    'users.name',
    'users.avatar'
];

class Product {
  public index(req: Request, res: Response): Response {
    const { page, offset } = req.query;
    return res.jsonOk(getPage(page, offset, JSONdb.products));
  }

  public async item(req: Request, res: Response): Promise<Response> {
    const { query, params } = req;
    const { filter } = params;

    if (!(filter in ProductFilter))
      return res.jsonBadRequest({ message: 'Filtro inválido' });

    try {
      return res.jsonOk(await ProductFilter[filter](query.value));
    } catch (err) {
      return res.jsonServerError();
    }
  }

  public async rating(req: Request, res: Response): Promise<Response> {
    const { rate, comment, product_id, user_id } = req.body;

    try {
      const [ratingId] = await db('rating').insert({
        rate,
        comment,
        user_id,
        product_id,
      });

      if (!ratingId)
        return res.jsonBadRequest({
          message: 'Não foi possível criar um comentário',
        });

      const [createdComment] = await db('rating')
        .join('users', 'users.id', '=', user_id)
        .where('rating.id', '=', ratingId)
        .select(COMMENTS_SELECT);

      return res.jsonOk({ comment: createdComment });
    } catch (error) {
      return res.jsonServerError({ error });
    }
  }

  public async comments(req: Request, res: Response): Promise<Response> {
    const { product_id } = req.params;
    const { page = 1 } = req.query;

    if (!product_id)
      return res.jsonBadRequest({
        message: 'Product id deve ser um valor válido!',
      });

    try {
      const comments = await db('rating')
        .where('rating.product_id', '=', product_id)
        .join('users', 'users.id', '=', 'rating.user_id')
        .select(COMMENTS_SELECT)
        .limit(ITEMS_FOR_PAGE)
        .offset((Number(page) - 1) * ITEMS_FOR_PAGE);

      if (Number(page) == 1) {
        const [count] = await db('rating')
          .where('rating.product_id', '=', product_id)
          .count();
        const quantity = Number(count['count(*)']) ?? ITEMS_FOR_PAGE;
        const pages = Math.ceil(quantity / ITEMS_FOR_PAGE);

        return res.jsonOk({ comments, pages });
      }

      return res.jsonOk({ comments });
    } catch {
      return res.jsonServerError();
    }
  }
}

export default new Product();
