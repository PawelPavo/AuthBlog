import * as express from 'express';
import * as passport from 'passport';
import type { ReqUser } from '../../utils/interfaces';
import { Router } from 'express';
import db from '../../db';
import { blogBody } from '../../middlewares/blogs';

const router = Router();

//GET api/blogs
router.get('/', async (req: ReqUser, res, next) => {
    try {
        const blogs = await db.blogs.all();
        res.json(blogs);
    } catch (error) {
        next(error);
    };
});

//GET api/blogs/:id
router.get('/:id', async (req: ReqUser, res, next) => {
    const id = req.params.id;
    try {
        const [blog] = await db.blogs.one(id);
        res.json(blog);
    } catch (error) {
        next(error);
    };
});


//POST api/blogs
router.post('/', blogBody, async (req: ReqUser, res, next) => {
    const blog = req.body;
    try {
        const { insertId } = await db.blogs.insert(blog.title, blog.content, blog.authorid, blog.image_url);
        await db.blogTags.insert(insertId, blog.tagid)
        res.status(201).json({ insertId, msg: 'Blog Inserted' });
    } catch (error) {
        next(error);
    };
});

//PUT api/blogs/:id
router.put('/:id', passport.authenticate('jwt'), async (req: ReqUser, res, next) => {
    const id = Number(req.params.id);
    const blogTitle = req.body.title;
    const blogContent = req.body.content;

    try {
        const result = await db.blogs.update(blogTitle, blogContent, id)
        res.status(200).json({ msg: 'Blog has been updated', result })
    } catch (error) {
        next(error);
    };
});

// DELETE api/blogs/:id
router.delete('/:id',passport.authenticate('jwt'), async (req: ReqUser, res, next) => {
    const id = Number(req.params.id);
    try {
        const result = await db.blogs.destroy(id)
        res.status(200).json({ msg: 'Blog Deleted', result })
    } catch (error) {
        next(error);
    };
});

export default router;
