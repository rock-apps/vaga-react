import express from 'express';
import cors from 'cors';
import products from './controllers/products';

class App {
  public express: express.Application;

  public constructor() {
    this.express = express();

    this.middlewares();
    this.routes();
  }

  private middlewares(): void {
    this.express.use(express.json());
    this.express.use(cors());
  }

  private routes(): void {
    this.express.get('/', products.index);
    this.express.get('/categories', products.categories);
  }
}

export default new App().express;
