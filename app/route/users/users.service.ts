import model from "./users.model";

const getAll = async () => {
  return await model.find({ deleted: false });
};

const getById = async (_id: string) => {
  return await model.findOne({ _id, deleted: false });
};

const add = async (_body: any) => {
  return await model.create(_body);
};

const update = async (_id: string, _body: any) => {
  return await model.findOneAndUpdate({ _id, deleted: false }, _body, { new: true });
};

const deleteById = async (_id: string) => {
  return await model.findOneAndUpdate({ _id, deleted: false }, { deleted: true }, { new: true });
};

const getByEmail = async (email: string) => {
  return await model.findOne({ email, deleted: false });
};

export default { getAll, getById, add, update, deleteById, getByEmail };
