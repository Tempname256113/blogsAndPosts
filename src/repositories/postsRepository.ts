import {IRequestPostModel, IPost} from "../models/models";
import {blogsRepository} from "./blogsRepository";


const postsArrayDB: IPost[] = [];
let id: number = 0;

export const postsRepository = {
    getAllPosts(){
        return postsArrayDB;
    },
    createNewPost(newPost: IRequestPostModel): IPost{
        id++;
        const createdPost: IPost = {
            id: String(id),
            title: newPost.title,
            shortDescription: newPost.shortDescription,
            content: newPost.content,
            blogId: newPost.blogId,
            blogName: blogsRepository.findBlogNameByID(newPost.blogId)
        }
        postsArrayDB.push(createdPost);
        return createdPost;
    },
    getPostByID(id: string): IPost | undefined {
        return postsArrayDB.find(elem => elem.id === id);
    },
    updatePostByID(id: string, post: IRequestPostModel): void {
        const otherValues = postsArrayDB.filter(elem => elem.id !== id);
        const currentValue: any = postsArrayDB.find(elem => elem.id === id);
        postsArrayDB.splice(0);
        postsArrayDB.push({
            id: currentValue.id,
            title: post.title,
            shortDescription: post.shortDescription,
            content: post.content,
            blogId: post.blogId,
            blogName: blogsRepository.findBlogNameByID(post.blogId)
        });
        postsArrayDB.push(...otherValues);
    }
}