import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken'
import ENV from '../env'


export default async (_req: Request<any>, _res: Response<any>, next: NextFunction) => {


    next();
};