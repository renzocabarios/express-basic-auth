import users from "../users/users.service";
import { Request, Response } from 'express';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import ENV from '../../env'

const authenticate = async (_req: Request<any>, _res: Response<any>) => {
  const { email, password } = _req.body
  const data = await users.getByEmail(email);

  if (!data) {
    _res.send({ data: [], status: "fail", message: "User does not exist" });
    return;
  }


  if (
    !await bcrypt.compare(password, data.password)
  ) {
    _res.send({ data: [], status: "fail", message: "Wrong password" });
    return;
  }

  const token = await jwt.sign({ id: data._id }, ENV.JWT_KEY, { expiresIn: "1y" })

  _res.send({ data: [data], status: "success", message: "Authentication successful", meta: { token } });
};



export { authenticate };
