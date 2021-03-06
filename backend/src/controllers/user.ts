import db from '../database/connection';

import { Request, Response } from 'express';

import bcrypt from 'bcrypt';
import {
  generateJwt,
  generateRefreshJwt,
  getTokenFromHeaders,
  verifyRefreshJwt,
} from '../utils/jwt';
class User {
  public async index(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    if (!id) return res.jsonBadRequest();

    try {
      const [account] = await db('users').select('*').where('id', '=', id);

      if (!account) throw 'account';
      const { password, jwtVersion, ...restAccount } = account;

      return res.jsonOk({ account: restAccount });
    } catch (err) {
      if (err === 'account') return res.jsonBadRequest();
      return res.jsonServerError();
    }
  }

  public async create(req: Request, res: Response): Promise<Response> {
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

      const [account] = await db('users')
        .select('*')
        .where('id', '=', newAccountId);

      const token = generateJwt({ id: account.id });
      const refreshToken = generateRefreshJwt({
        id: account.id,
        version: account.jwtVersion,
      });

      res.jsonOk({
        avatar,
        id: account.id,
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

  public async login(req: Request, res: Response): Promise<Response> {
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
      const refreshToken = generateRefreshJwt({
        id: account.id,
        version: account.jwtVersion,
      });

      return res.jsonOk({
        id: account.id,
        avatar: account.avatar,
        token,
        refreshToken,
      });
    } catch (err) {
      return res.jsonServerError();
    }
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    try {
      const [account] = await db('users')
        .select('*')
        .where('email', '=', email);

      if (!account)
        return res.jsonBadRequest({
          message: 'Houve um erro ao deletar sua conta!',
        });

      const match = bcrypt.compareSync(password, account.password);
      if (!match) res.jsonBadRequest({ message: 'Senha inválida' });

      await db('users').delete('*').where({
        id: account.id,
      });

      return res.jsonOk();
    } catch {
      return res.jsonServerError({
        message: 'Não foi possível deletar sua conta',
      });
    }
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { name, tel, email, password, avatar, address } = req.body;

    try {
      const [account] = await db('users')
        .select('*')
        .where('users.email', '=', email);

      const ERROR_MESSAGE = 'Senha ou e-mail incorretos';

      if (!account) return res.jsonBadRequest({ message: ERROR_MESSAGE });

      const match = bcrypt.compareSync(password, account.password);
      if (!match) return res.jsonBadRequest({ message: ERROR_MESSAGE });

      await db('users')
        .update({
          name,
          tel,
          avatar,
          address,
        })
        .where('id', '=', account.id);

      return res.jsonOk();
    } catch (err) {
      return res.jsonServerError();
    }
  }

  public async refresh(req: Request, res: Response): Promise<Response> {
    const token = getTokenFromHeaders(req.headers);
    if (!token) res.jsonUnauthorized({ message: 'Token inválido' });

    try {
      const decoded = verifyRefreshJwt(token);

      const [account] = await db('users')
        .select('*')
        .where('id', '=', decoded.id);

      if (!account) return res.jsonUnauthorized();
      if (decoded.version !== account.jwtVersion) return res.jsonUnauthorized();

      const meta = {
        token: generateJwt({ id: account.id }),
      };

      return res.jsonOk(meta);
    } catch (err) {
      return res.jsonUnauthorized();
    }
  }
}

export default new User();
