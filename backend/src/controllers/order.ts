require('dotenv').config();

import { Request, Response } from 'express';
import paypal from '@paypal/checkout-server-sdk';
import formatProductsToPaypal, {
  Products,
  PurchaseUnits,
} from '../utils/formatProductsToPaypal';

const environment = new paypal.core.SandboxEnvironment(
  process.env.PAYPAL_CLIENT_ID,
  process.env.PAYPAL_SECRET_ID
);
const client = new paypal.core.PayPalHttpClient(environment);

class Order {
  public async create(req: Request, res: Response) {
    const products: Products[] = req.body.products;
    let items: PurchaseUnits;

    if (!products)
      return res.status(400).json({ message: 'Conteúdo inválido' });

    try {
      items = formatProductsToPaypal(products);
    } catch (err) {
      res.status(400).json({ message: 'Conteúdo inválido' });
    }

    const request = new paypal.orders.OrdersCreateRequest();
    request.requestBody({
      intent: 'AUTHORIZE',
      application_context: {
        return_url: 'https://example.com',
        cancel_url: 'https://example.com',
        locale: 'pt-BR',
      },
      purchase_units: [{ ...items }],
    });

    let order;
    try {
      order = await client.execute(request);
    } catch (err) {
      res.sendStatus(500);
      throw err;
    }

    res.status(200).json({
      token: order.result.id,
    });
  }
}

export default new Order();
