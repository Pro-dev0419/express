import { Router } from "express";
import JobController from "../controllers/BotsController";
import UsersController from "../controllers/UsersController";
import Authorize from "../middleware/Authorize";
import jobSchemas from "../schemas/job";
import jobSchemas2 from "../schemas/user";
import Validate from "../middleware/Validate";

const router = Router();
const controller = require("../controllers/file.controller");


/*router.post(
  "/saveJob",
  Validate.prepare(jobSchemas.saveJob),
  JobController.saveJob
);*/

router.post(
	"/suscribebot",
	Validate.prepare(jobSchemas.saveJob),
	JobController.saveJob
  );

router.post("/img", controller.upload);

/*router.post(
	"/saveUser",
	Validate.prepare(jobSchemas2.saveUser),
	UsersController.saveUser
  );

router.get(
  "/rss/jobs",
  JobController.getRSSJobList
);

router.get(
  "/remote-jobs",
  JobController.getJobs
);

router.get(
  "/categories",
  JobController.getCategories
);*/


router.get("/files", controller.getListFiles);
router.get("/files/:name", controller.download);

export default router; 
