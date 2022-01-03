import { Post } from "./post.model";

export interface Category {
    _id: string,
    name: string,
    posts: Post[]
}