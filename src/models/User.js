import mongoose, { Schema } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const refreshTokens = new Schema({
  token: {
    type: String,
    required: true,
  },
});

const UserSchema = new Schema(
	{
	  name: {
		type: String,
		required: true,
		minlength: 2,
		trim: true,
	  },
	  password: {
		type: String,
		required: true,
		minlength: 8,
	  },
	  email: {
		type: String,
		required: true,
		unique: true,
		trim: true,
	  },
	  accountType: {
		type: Number,
		// required: true, type1: User type2:Company
		trim: true,
	  },
	  api_key_binance: {
		  type: String,
	  },
	  api_keys_kraken: {
		  type: String,
	  },
	  api_keys_bittrex: {
		  type: String,
	  },
	  api_url_bot1: {
		  type: String,
	  },
	  api_username_bot1: {
		  type: String,
	  },
	  api_password_bot1: {
		  type: String,
	  },
	  profilePhoto: String,
	  location: {
		type: String,
		// required: true,
	  },
	  websiteUrl: String,
	  github: String,
	  linkedln: String,
	  twitter: String,
	  instagram: String,
	  createdAt: {
		type: Date,
		default: Date.now(),
	  },
	  tags: [Number],
	  language: [Number],
	  availableDate: {
		type: Date,
		default: Date.now(),
	  },
	  role: {
		type: String,
		required: true,
		default: "user",
		trim: true,
	  },
	  refreshTokens: [refreshTokens],
	},
	{
	  timestamps: true,
	}
  );

mongoose.set("useCreateIndex", true);
UserSchema.plugin(uniqueValidator);

export default mongoose.model("User", UserSchema);
