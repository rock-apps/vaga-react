import express from 'express';
import cors from 'cors';

import checkJwt from './middlewares/jwt';
import response from './middlewares/response';

import product from './controllers/products/product';
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
    const { express: app } = this;
    
    app.use(express.json());
    app.use(checkJwt);
    app.use(response);
    app.use(cors());
  }

  private routes(): void {
    const { express: app } = this;

    app.get('/product', product.index);
    app.get('/product/:filter', product.item);
    app.get('/product/categories', product.categories);

    app.post('/order/create', order.create);
    app.post('/order/capture', order.capture);

    app.post('/user/sign-up', user.signUp);
    app.post('/user/sign-in', user.signIn);
    app.post('/refresh', user.refresh);
  }
}

export default new App().express;
