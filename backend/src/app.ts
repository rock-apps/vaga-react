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
	
    app.use(cors());
    app.use(express.json());
    app.use(response);
    app.use(checkJwt);
  }

  private routes(): void {
    const { express: app } = this;

    app.get('/product', product.index);
    app.get('/product/:filter', product.item);

    app.post('/order/create', order.create);

    app.get('/user/:id', user.index);
    app.put('/user/update', user.update);
    app.post('/user/sign-in', user.login);
    app.post('/user/sign-up', user.create);
    app.delete('/user/delete', user.delete);
    
    app.post('/refresh', user.refresh);
  }
}

export default new App().express;
