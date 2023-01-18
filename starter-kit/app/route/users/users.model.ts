import mongoose from "mongoose";
import { RESOURCE } from "../../constant";

const schema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    deleted: { type: Boolean, default: false },
});

export default mongoose.model(RESOURCE.USERS, schema);
