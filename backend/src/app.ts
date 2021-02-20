import express from 'express';
import cors from 'cors';
import product from './controllers/product';
import order from './controllers/order';
import user from './controllers/user';
import checkJwt from './middlewares/jwt';

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
    app.use(cors());
  }

  private routes(): void {
    const { express: app } = this;

    app.get('/products', product.index);
    app.get('/products/categories', product.categories);

    app.post('/order/create', order.create);
    app.post('/order/capture', order.capture);

    app.post('/user/sign-up', user.signUp);
    app.post('/user/sign-in', user.signIn);
  }
}

export default new App().express;
