import db from '../database/connection';

import { Request, Response } from 'express';

import bcrypt from 'bcrypt';
import {
  generateJwt,
  generateRefreshJwt,
  getTokenFromHeaders,
} from '../utils/jwt';

class User {
  async signUp(req: Request, res: Response): Promise<Response> {
    const { name, tel, email, password, avatar, address } = req.body;
    
    const emailAlreadyExists = await db('users')
      .select('users.email')
      .where('users.email', '=', email);

    if (emailAlreadyExists.length > 0) {
      return res.jsonBadRequest({
        message: 'Endereço de email já cadastrado!',
      });
    }

    try {
      const hash = bcrypt.hashSync(password, 10);

      const [newAccountId] = await db('users').insert({
        name,
        tel,
        email,
        password: hash,
        avatar,
        address,
      });

      const token = generateJwt({ id: newAccountId });
      const refreshToken = generateRefreshJwt({ id: newAccountId });

      res.jsonOk({
        email,
        id: newAccountId,
        token,
        refreshToken,
      });
    } catch (err) {
      res.jsonServerError({
        message:
          'Ocorreu um erro ao cadastrar sua conta, por favor tente mais tarde',
      });
    }
  }

  async signIn(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    try {
      const [account] = await db('users')
        .select('*')
        .where('users.email', '=', email);

      const ERROR_MESSAGE = 'Senha ou e-mail incorretos';

      if (!account) return res.jsonBadRequest({ message: ERROR_MESSAGE });

      const match = bcrypt.compareSync(password, account.password);
      if (!match) return res.jsonBadRequest({ message: ERROR_MESSAGE });

      const token = generateJwt({ id: account.id });
      const refreshToken = generateRefreshJwt({ id: account.id });

      return res.jsonOk({
        id: account.id,
        email: account.email,
        token,
        refreshToken,
      });
    } catch (err) {
      return res.jsonServerError();
    }
  }
}

export default new User();
