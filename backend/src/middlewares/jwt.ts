import { Request, Response, NextFunction } from 'express';
import { getTokenFromHeaders, verifyJwt } from '../utils/jwt';

const STATUS_CODE_UNAUTHORIZED = 401;
const EXCLUDED_PATHS = ['/user/sign-in', '/user/sign-up'];

const checkJwt = (req: Request, res: Response, next: NextFunction) => {
  const { url: path } = req;

  const isExcluded = !!EXCLUDED_PATHS.find((p) => path.includes(p));
  if (isExcluded) return next();

  let token = getTokenFromHeaders(req.headers);
  if (!token) return res.sendStatus(STATUS_CODE_UNAUTHORIZED);

  try {
    const decoded = verifyJwt(token) as { id: string };

    res.locals = {
      ...res.locals,
      session: decoded.id,
    };

    next();
  } catch (err) {
    res.sendStatus(STATUS_CODE_UNAUTHORIZED);
  }
};

export default checkJwt;