import service from "./users.service";
import { Request, Response } from 'express';
import bcrypt from 'bcrypt'
import ENV from '../../env'

const getAll = async (_req: Request<any>, _res: Response<any>) => {
  const data = await service.getAll();
  _res.send({ data, status: "success", message: "Get all users success" });
};

const getById = async (_req: Request<any>, _res: Response<any>) => {
  const { id } = _req.params;
  const data = await service.getById(id);
  _res.send({ data: [data], status: "success", message: "Get user success" });

};

const add = async (_req: Request<any>, _res: Response<any>) => {
  const { password, ...res } = _req.body;
  const hashed = await bcrypt.hash(password, ENV.HASH_SALT)
  console.log({ password: hashed, res });

  const data = await service.add({ password: hashed, ...res });
  _res.send({ data: [data], status: "success", message: "Create user success" });

};

const update = async (_req: Request<any>, _res: Response<any>) => {
  const { id } = _req.params;
  const { password, ...res } = _req.body;
  const data = await service.update(id, res);
  _res.send({ data: [data], status: "success", message: "Update user success" });

};

const deleteById = async (_req: Request<any>, _res: Response<any>) => {
  const { id } = _req.params;
  const data = await service.deleteById(id);
  _res.send({ data: [data], status: "success", message: "Delete user success" });

};

export { getAll, getById, add, update, deleteById };
