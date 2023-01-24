import mongoose, { Schema } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const JobSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: String,
	  url: String, 
    how_apply: String,
	  coupon: String,
	  max_salary: Number, 
	  min_salary: Number,
	  views: Number,
	  applied: Number,
	  candidate_required_location: String,
	  salary: String,
    totalsum: Number,
    job_type: {
      type: String,
      required: true,
    },
    company_name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    tags: [{
		type: 'String'
	  }],
    apply_url: {
      type: String,
      required: true,
    },
    company_email: {
      type: String,
      required: true,
    },
    invoice_addr: {
      type: String,
      required: true,
    },
    po_number: String,
    publication_date: {
      type: Date,
      default: Date.now(),
    },
    company_logo: String,
    jobOption1: {
      type: Boolean,
      default: false,
    },
    jobOption2: {
      type: Boolean,
      default: false,
    },
    jobOption3: {
      type: Boolean,
      default: false,
    },
	  jobOption3plus: Number,
    highlightPost: {
      type: Boolean,
      default: false,
    },
	  urgent: {
		  type: Boolean,
      	default: false,
	  }
  },
  {
    timestamps: true,
  }
);

mongoose.set("useCreateIndex", true);
JobSchema.plugin(uniqueValidator);

export default mongoose.model("Job", JobSchema);