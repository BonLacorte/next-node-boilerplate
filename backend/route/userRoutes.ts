import { Router } from "express";
import { getUsers, createUser, deleteUser, updateUser } from "../controllers/userController";

const router = Router();

router.get("/", getUsers);
router.post("/", createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;