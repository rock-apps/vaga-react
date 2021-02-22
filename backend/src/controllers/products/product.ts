import { Request, Response } from 'express';

import ProductFilter from './filter';
import db from '../../../products.json';
import getPage from '../../utils/getPage';

const ERROR_RESPONSE = { products: [] };

class Product {
  public index(req: Request, res: Response) {
    const { page, offset } = req.query;
    return res.jsonOk(getPage(page, offset, db.products));
  }

  public item(req: Request, res: Response) {
    const { query, params } = req;
    const { filter } = params;

    if (typeof filter === 'string') {
      try {
        const filterHandler = ProductFilter[filter];
        return res.jsonOk(filterHandler(query.value));
      } catch (err) {
        return res.jsonBadRequest(ERROR_RESPONSE);
      }
    }

    return res.jsonServerError(ERROR_RESPONSE);
  }

  public categories(req: Request, res: Response) {
    return res.jsonOk({
      categories: db.categories,
    });
  }
}

export default new Product();
