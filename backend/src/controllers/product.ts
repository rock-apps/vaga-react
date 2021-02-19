import { Request, Response } from 'express';

import db from '../../products.json';
import getPage from '../utils/getPage';

class Product {
  public index(req: Request, res: Response) {
    const { page, offset } = req.query;
    return res.status(200).json(getPage(page, offset, db.products));
  }

  public categories(req: Request, res: Response) {
    return res.status(200).json({
      categories: db.categories,
    });
  }
}

export default new Product();
