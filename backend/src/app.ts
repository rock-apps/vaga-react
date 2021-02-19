import express from 'express';
import cors from 'cors';
import product from './controllers/product';
import order from './controllers/order';

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
    this.express.get('/products', product.index);
    this.express.get('/products/categories', product.categories);
  }
}

export default new App().express;
