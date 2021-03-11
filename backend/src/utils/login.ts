import db from '../database/connection';
import bcrypt from 'bcrypt';

interface Login {
  email: string;
  password: string;
}

const checkLogin = async ({
  email,
  password,
}: Login) => {
  const [account] = await db('users')
    .select('*')
    .where('users.email', '=', email);

  const ERROR_MESSAGE = 'Senha ou e-mail incorretos';
  if (!account) throw ERROR_MESSAGE;

  const match = bcrypt.compareSync(password, account.password);
  if (!match) throw ERROR_MESSAGE;

  return account;
};

export default checkLogin;
