import mongoose from "mongoose";
const schema = mongoose.Schema({
  id: { type: String, required: true },
  author: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  imgUrl: { type: String, required: true },
  releaseDate: { type: Number, required: false },
});
export default mongoose.model("Book", schema);
