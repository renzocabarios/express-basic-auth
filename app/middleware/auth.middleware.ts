import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken'
import ENV from '../env'


export default async (_req: Request<any>, _res: Response<any>, next: NextFunction) => {

    const publicRoutes = [{ url: '/api/v1/auth', method: 'POST' }, { url: '/api/v1/users', method: 'POST' }];

    if (publicRoutes.find((route) => route.url === _req.url && route.method === _req.method)) {
        next();
        return;
    }

    if (!_req.headers['authorization']) {
        _res.send({ data: [], status: "fail", message: "Unauthorized" });
        return;
    }

    const token = _req.headers['authorization'].split(" ")[1];

    if (!(await jwt.verify(token, ENV.JWT_KEY))) {
        _res.send({ data: [], status: "fail", message: "Token invalid" });
        return;
    }

    next();
};