import mongoose from "mongoose";
const schema = mongoose.Schema({
  id: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  hobby: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: String, required: false },
});
export default mongoose.model("User", schema);
