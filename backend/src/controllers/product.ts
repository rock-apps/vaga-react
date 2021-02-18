import { Request, Response } from "express";
import db from '../../products.json';

class Product {
  index(req: Request, res: Response) {
    return res.status(200).json({
      products: db.products,
    });
  }

  categories(req: Request, res: Response) {
    return res.status(200).json({
      categories: db.categories,
    });
  }

  create
}

export default new Product();