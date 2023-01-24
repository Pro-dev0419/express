import mongoose, { Schema } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const CategorySchema = new Schema(
  {
    name: String,
    slug: String,
	  id: Number
  },
  {
    timestamps: true,
  }
);

mongoose.set("useCreateIndex", true);
CategorySchema.plugin(uniqueValidator);

export default mongoose.model("Category", CategorySchema);