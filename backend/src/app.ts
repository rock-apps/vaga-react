import express from 'express';
import cors from 'cors';

import checkJwt from './middlewares/jwt';
import response from './middlewares/response';

import product from './controllers/products/product';
import order from './controllers/order';
import user from './controllers/user';

class App {
  public app: express.Application;

  public constructor() {
    this.app = express();

    this.middlewares();
    this.routes();
  }

  private middlewares(): void {
    const { app } = this;

    app.use(cors());
    app.use(response);
	  app.use(checkJwt);
    app.use(express.json());
  }

  private routes(): void {
    const { app } = this;

    app.get('/product', product.index);
    app.get('/product/:filter', product.item);
    app.post('/product/rate', product.rating);
    app.get('/product/comments/:product_id', product.comments);

    app.post('/order/create', order.create);

    app.get('/user/:id', user.index);
    app.put('/user/update', user.update);
    app.post('/user/sign-in', user.login);
    app.post('/user/sign-up', user.create);
    app.delete('/user/delete', user.remove);

    app.post('/refresh', user.refresh);
  }
}

export default new App().app;
