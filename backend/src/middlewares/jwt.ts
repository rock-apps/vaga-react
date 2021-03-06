import { Request, Response, NextFunction } from 'express';
import { getTokenFromHeaders, verifyJwt } from '../utils/jwt';

const EXCLUDED_PATHS = [
  '/product',
  '/products/:filter',
  '/refresh',
  '/user/sign-in',
  '/user/sign-up',
];

const checkJwt = (req: Request, res: Response, next: NextFunction) => {
  const { url: path } = req;

  const isExcluded = !!EXCLUDED_PATHS.find(p => path.includes(p));
  if (isExcluded) return next();

  let token = getTokenFromHeaders(req.headers);
  if (!token) return res.jsonUnauthorized();

  try {
    const decoded = verifyJwt(token) as { id: string };

    res.locals = {
      ...res.locals,
      session: decoded.id,
    };

    next();
  } catch (err) {
    res.jsonUnauthorized();
  }
};

export default checkJwt;
