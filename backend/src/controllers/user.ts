import db from '../database/connection';

import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { generateJwt, generateRefreshJwt } from '../utils/jwt';

const STATUS_CODE_OK = 200;
const STATUS_CODE_CREATED = 201;
const STATUS_CODE_BAD_REQUEST = 400;
const STATUS_CODE_SERVER_ERROR = 500;

class User {
  async signUp(req: Request, res: Response) {
    const { name, tel, email, password, avatar, address } = req.body;

    const emailAlreadyExists = await db('users')
      .select('users.email')
      .where('users.email', '=', email);

    if (emailAlreadyExists.length > 0) {
      return res
        .status(STATUS_CODE_BAD_REQUEST)
        .json({ message: 'Endereço de email já cadastrado!' });
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

      res.status(STATUS_CODE_CREATED).json({
        email,
        id: newAccountId,
        token,
        refreshToken,
      });
    } catch (err) {
      res.sendStatus(STATUS_CODE_SERVER_ERROR);
    }
  }

  async signIn(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
      const [account] = await db('users')
        .select('*')
        .where('users.email', '=', email);

      if (!account) return res.sendStatus(STATUS_CODE_BAD_REQUEST);

      const match = bcrypt.compareSync(password, account.password);
      if (!match) return res.sendStatus(STATUS_CODE_BAD_REQUEST);

      const token = generateJwt({ id: account.id });
      const refreshToken = generateRefreshJwt({ id: account.id });

      res.status(STATUS_CODE_OK).json({
        id: account.id,
        email: account.email,
        token,
        refreshToken,
      });
    } catch (err) {
      res.sendStatus(STATUS_CODE_SERVER_ERROR);
    }
  }
}

export default new User();
