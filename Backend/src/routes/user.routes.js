import express from "express";
import {
    allUsers,
    changeUserPassword,
    refreshAccessTokenUser,
    singleUser,
    userDelete,
    userLogin,
    userLogout,
    userRegister,
    userUpdate,
} from "../controller/user.controller.js";
import { authenticateToken } from "../middleware/authenticateToken.middleware.js";
import { authorizeRoles } from "../middleware/authorizeRoles.middleware.js";

const router = express.Router();

router.post(
    "/user-regiter",
    authenticateToken,
    authorizeRoles("Admin"),
    userRegister
);
router.post("/user-login", userLogin);
router.post("/user-logout", userLogout);
router.post("/user-refresh-token", refreshAccessTokenUser);
router.get("/all-users", authenticateToken, authorizeRoles("Admin"), allUsers);
router.get("/single-user/:userId", singleUser);
router.put("/update-user/:userId", userUpdate);
router.delete("/delete-user/:userId", userDelete);
router.put("/change-user-password/:userId", changeUserPassword);

export { router as userRouter };
