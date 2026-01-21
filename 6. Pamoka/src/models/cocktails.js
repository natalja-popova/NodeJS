import mongoose from "mongoose";
const schema = mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  ingredients: { type: Array, required: true },
  isAlcoholic: { type: Boolean, required: true },
  imgUrl: { type: String, required: true },
});
export default mongoose.model("Cocktail", schema);
