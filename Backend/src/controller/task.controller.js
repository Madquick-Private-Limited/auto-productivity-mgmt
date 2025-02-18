import { Project } from "../model/project.model.js";
import { ApiResponse } from "../util/responseHandler.js";
import wrapAsyncUtil from "../util/wrapAsync.util.js";

export const getTeamMemberByProjectId = wrapAsyncUtil(
    async (req, res, next) => {
        const { projectId } = req.params;

        const project = await Project.findById(projectId).populate(
            "team",
            "name"
        );

        if (!project) {
            return res
                .status(404)
                .json(new ApiResponse(404, null, "Project not found"));
        }

        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    project.team,
                    "Team members retrieved successfully"
                )
            );
    }
);
