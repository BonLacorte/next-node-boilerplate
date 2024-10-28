import { Request, Response } from "express";
import { posts } from "./dummyData";

export const getPosts = (req: Request, res: Response) => {
    res.json(posts);
};

export const getPostById = (req: Request, res: Response) => {
    const { id } = req.params;
    const post = posts.find((post) => post.id === parseInt(id));
    res.json(post);
};

export const addPost = (req: Request, res: Response): any => {
    const { title, userId } = req.body;
    const post = { id: posts.length + 1, title, userId };
    posts.push(post);
    res.json(post);
};

export const updatePost = (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, userId } = req.body;
    const postIndex = posts.findIndex((post) => post.id === parseInt(id));
    
    posts[postIndex] = { ...posts[postIndex], title, userId };
    res.json(posts[postIndex]);
};

export const deletePost = (req: Request, res: Response) => {
    const { id } = req.params;
    const postIndex = posts.findIndex((post) => post.id === parseInt(id));
    
    const deletedPost = posts.splice(postIndex, 1)[0];
    res.json(deletedPost);
};