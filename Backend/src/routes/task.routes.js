import express from "express";
import { getTeamMemberByProjectId } from "../controller/task.controller.js";

const router = express.Router();

router.get("/get-team-member/:projectId", getTeamMemberByProjectId);

export { router as taskRouter };
