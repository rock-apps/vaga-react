import { Request, Response } from "express";
import db from '../../products.json';

class Products {
  index(req: Request, res: Response) {
    return res.status(200).json({
      ...db,
    });
  }
}

export default new Products();