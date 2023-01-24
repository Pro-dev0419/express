import TryCatchErrorDecorator from "../decorators/TryCatchErrorDecorator";
import JobModel from "../models/Job";
import CategoryModel from "../models/Category";

import Parser from "rss-parser";

class JobController {
  @TryCatchErrorDecorator
  static async saveJob(req, res) {
    

    if (req.body._id) {
       //const queries = JobModel.findOne({ _id: req.body._id });
       //query.query = req.body.query;
       //query.save();
      //update
    } else {
      const newJobAd = new JobModel({
		title: req.body.title,
		description: req.body.description,
		how_apply: req.body.how_apply,
		coupon: req.body.coupon,
		max_salary: req.body.max_salary,
		min_salary: req.body.min_salary,
		salary: req.body.salary,
		job_type: req.body.job_type,
		company_name: req.body.company_name,
		category: req.body.category,
		tags: req.body.tags,
		apply_url: req.body.apply_url,
		company_email: req.body.company_email,
		invoice_addr: req.body.invoice_addr,
		po_number: req.body.po_number,
		candidate_required_location: req.body.candidate_required_location,
		companyLogo: req.body.companyLogo,
		jobOption1: req.body.jobOption1,
		jobOption2: req.body.jobOption2,
		jobOption3: req.body.jobOption3,
		jobOption3plus: req.body.jobOption3plus,
		highlightPost: req.body.highlightPost,
		urgent: req.body.urgent,
    totalsum: req.body.totalsum,
      });
      await newJobAd.save();
      
      res.json({jobId:newJobAd._id});
    }
    
    // const queries = await JobModel.find({}).select("_id: req.body._id");
    // res.json(queries);
  }

  @TryCatchErrorDecorator
  static async getRSSJobList(req, res) {
    const parser = new Parser({
      customFields: {
        item: ['company', 'tags', 'location', 'image', 'description'],
      },
    });
    const feed = await parser.parseURL(process.env.RSS_URL);
    // feed.items.forEach((item) => {
    //   console.log(item);
    // });
    console.log(feed)
    res.json(feed);
  }

  @TryCatchErrorDecorator
  static async getJobs(req, res) {
    let limit=req.query.limit;    
    let search=req.query.search;    
    var optRegexp = [];

    if (limit===undefined) limit='50';
    
    if (search!==undefined){
      if (search.indexOf(',')>=0)
        search=search.split(',');
      else
        search=[search];
    }else{
      const queries = await JobModel.find().limit(parseInt(limit)).sort({jobOption1:-1}).sort({jobOption2:-1});    
      res.status(200).json({jobs: queries,'job-count':queries.length});
    }
      
    search.forEach(function(opt){
            optRegexp.push(  new RegExp(opt, "i") );
    });
    const queries = await JobModel.find({tags:{'$in':optRegexp}}).limit(parseInt(limit)).sort({jobOption1:-1}).sort({jobOption2:-1});    
    res.status(200).json({jobs: queries,'job-count':queries.length});
  }
  @TryCatchErrorDecorator
  static async getCategories(req, res) {
    const queries = await CategoryModel.find();    
    res.status(200).json({jobs:queries,'job-count':queries.length});
  }
  
}

export default JobController;
