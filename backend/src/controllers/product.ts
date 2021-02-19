import { Request, Response } from 'express';

import db from '../../products.json';

class Product {
  public index(req: Request, res: Response) {
    return res.status(200).json({
      products: db.products,
    });
  }

  public categories(req: Request, res: Response) {
    return res.status(200).json({
      categories: db.categories,
    });
  }
}

export default new Product();
