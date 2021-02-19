import db from '../database/connection';

import { Request, Response } from 'express';
import bcrypt from 'bcrypt';

const STATUS_CODE_OK = 200;
const STATUS_CODE_BAD_REQUEST = 400;
const STATUS_CODE_UNAUTHORIZED = 401;
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
    
    const hash = bcrypt.hashSync(password, 10);

    await db('users').insert({
      name,
      tel,
      email,
      password: hash,
      avatar,
      address,
    });

    return res.sendStatus(201);
  }
}

export default new User();