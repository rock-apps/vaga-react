import { Request, Response } from 'express';

import db from '../../products.json';
import getPage from '../utils/getPage';

const ERROR_RESPONSE = { products: [] };

class Product {
  public index(req: Request, res: Response) {
    const { page, offset } = req.query;
    return res.status(200).json(getPage(page, offset, db.products));
  }

  public item(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const index = Number(id) - 1;
      res.json(db.products[index]);
    } catch {
      res.json(ERROR_RESPONSE);
    }
  }

  public category(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const categoryId = Number(id);
      const selectedCategory = db.categories[categoryId];
      const products = db.products.filter(prod => prod.categoryId === categoryId);
      
      res.json({
        products,
        category: selectedCategory,
      });
    } catch {
      res.json(ERROR_RESPONSE);
    }
  }

  public categories(req: Request, res: Response) {
    return res.status(200).json({
      categories: db.categories,
    });
  }
}

export default new Product();
