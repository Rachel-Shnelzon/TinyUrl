import express from "express";
import LinkController from "../controllers/linkController.js";

const LinkRouter = express.Router();

LinkRouter.get("/", LinkController.getList);
LinkRouter.get("/:id", LinkController.getById);
LinkRouter.get("/:id/source", LinkController.getSourceById);
LinkRouter.post("/", LinkController.add);
// LinkRouter.put("/:id", LinkController.update);
// LinkRouter.delete("/:id", LinkController.delete);

export default LinkRouter;
;
