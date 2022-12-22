import {IRequestBlogModel} from "../models/models";
import {IBlog} from "../models/models";
import {client} from "../db";

const db = client.db('ht02DB').collection('blogs');

export const blogsRepositoryDB = {
    async getAllBlogs() {
        try {
            return await db.find({}).project({_id: false}).toArray();
        } catch (err: any) {
            return 'nothing';
        }
    },
    async createNewBlog(newBlog: IRequestBlogModel): Promise<IBlog> {
        try {
            const createdBlog: IBlog = {
                id: 'id' + (new Date()).getTime(),
                name: newBlog.name,
                description: newBlog.description,
                websiteUrl: newBlog.websiteUrl,
                createdAt: new Date().toISOString()
            };
            await db.insertOne(createdBlog);
            const createdBlogWithout_id = {...createdBlog} as any;
            delete createdBlogWithout_id._id;
            return createdBlogWithout_id;
        } catch (err: any) {
            throw new Error(err);
        }
    },
    async getBlogByID(id: string) {
        try {
            const foundedObj =  await db.findOne(
                {id: id}
            );
            if (foundedObj) {
                return {
                    id: foundedObj.id,
                    name: foundedObj.name,
                    description: foundedObj.description,
                    websiteUrl: foundedObj.websiteUrl,
                    createdAt: foundedObj.createdAt
                } as IBlog
            }
            return null;
        } catch (err: any) {
            return 'nothing';
        }
    },
    // возвращает false если такого объекта в базе данных нет
    // и true если операция прошла успешно
    async updateBlogByID(id: string, blog: IRequestBlogModel): Promise<false | true | 'nothing'> {
        try {
            const findElemByID = await db.findOne(
                {id: id}
            );
            if (findElemByID === null) {
                return false;
            }
            await db.updateOne(
                {id: id},
                {$set:
                        {
                            name: blog.name,
                            description: blog.description,
                            websiteUrl: blog.websiteUrl,
                        }
                }
            )
            return true;
        } catch (err: any) {
            return 'nothing';
        }
    },
    // возвращает false если такого объекта нет в базе данных
    // и true если успешно прошла операция
    async deleteBlogByID(id: string): Promise<false | true | 'nothing'> {
        try {
            const findElemByID = await db.findOne({id: id});
            if (findElemByID === null) {
                return false;
            }
            await db.deleteOne({id: id});
            return true;
        } catch {
            return 'nothing';
        }
    },
    async findBlogNameByID(id: string) {
        try {
            const blogByID =  await db.findOne({id: id});
            if (blogByID !== null) return blogByID.name;
            return null;
        } catch {
            return 'nothing';
        }
    },
    async deleteAllData(): Promise<void | 'nothing'>{
        try {
            await db.deleteMany({});
        } catch {
            return 'nothing'
        }
    }
}