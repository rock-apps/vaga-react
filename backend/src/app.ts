import express from 'express';
import cors from 'cors';
import product from './controllers/product';
import order from './controllers/order';
import user from './controllers/user';

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
    const { express } = this;

    express.get('/products', product.index);
    express.get('/products/categories', product.categories);

    express.post('/order/create', order.create);
    express.post('/order/capture', order.capture);

    express.post('/user/sign-up', user.signUp);
    express.post('/user/sign-in', user.signIn);
  }
}

export default new App().express;
