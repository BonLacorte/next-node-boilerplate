import { Request, Response } from "express";
import { comments } from "./dummyData";

export const getComments = (req: Request, res: Response) => {
    res.json(comments);
};

export const addComment = (req: Request, res: Response) => {
    const { comments: content, userId, postId } = req.body;
    const newComment = {
        id: comments.length > 0 ? Math.max(...comments.map(c => c.id)) + 1 : 1,
        comments: content,
        userId,
        postId
    };
    comments.push(newComment);
    res.status(201).json(newComment);
};