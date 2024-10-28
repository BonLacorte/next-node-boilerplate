import { users } from "./dummyData";
import { Request, Response } from "express";

export const getUsers = (req: Request, res: Response) => {
    res.json(users);
};

export const getUserById = (req: Request, res: Response) => {
    const { id } = req.params;
    const user = users.find((user) => user.id === parseInt(id));
    res.json(user);
};

export const createUser = (req: Request, res: Response) => {
    const { name, email } = req.body;
    const user = { id: users.length + 1, name, email };
    users.push(user);
    res.json(user);
};

export const updateUser = (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, email } = req.body;
    const userIndex = users.findIndex((user) => user.id === parseInt(id));

    users[userIndex] = { ...users[userIndex], name, email };
    res.json(users[userIndex]);
};

export const deleteUser = (req: Request, res: Response) => {
    const { id } = req.params;
    const userIndex = users.findIndex((user) => user.id === parseInt(id));

    const deletedUser = users.splice(userIndex, 1)[0];
    res.json(deletedUser);
};