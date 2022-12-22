import express, {Request, Response} from "express";
import {blogsRouter} from "./routes/blogsRouter";
import {postsRouter} from "./routes/postsRouter";
import {postsService} from "./domain/postsService";
import {blogsService} from "./domain/blogsService";

export const app = express();

app.use(express.json());
app.use('/blogs', blogsRouter);
app.use('/posts', postsRouter);
app.delete('/testing/all-data', async (req: Request, res: Response) => {
    await Promise.all([blogsService.deleteAllData(), postsService.deleteAllData()])
    res.status(204).end();
})