/* eslint-disable prettier/prettier */
const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async(req, res) => {
    try {
        const allPosts = await Post.findAll({
            include: [User],
        });
        const posts = allPosts.map((post) => post.get({ plain: true }));
        res.render('homepage', { posts });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/dashboard', withAuth, async(req, res) => {
    try {
        const userPosts = await Post.findAll({
            where: {
                user_id: req.session.userId,
            },
        }, {
            attributes: ['title', 'date_created'],
        });
        const posts = userPosts.map((post) => post.get({ plain: true }));
        res.render('personal-posts', { posts, layout: 'dashboard' });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/post/:id', async(req, res) => {
    try {
        const requiredPost = await Post.findBypk(req.param.id, {
            include: [
                User,
                {
                    model: Comment,
                    include: [User],
                },
            ],
        });

        if (requiredPost) {
            const post = requiredPost.get({ plain: true });

            res.render('post', { post });
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.render('/');
    }
    res.render('login');
});

router.get('/signup', (req, res) => {

    res.render('signup');
});

module.exports = router;