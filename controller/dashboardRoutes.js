/* eslint-disable prettier/prettier */
const router = require('express').Router();
const { Post } = require('../models');
const withAuth = require('../utils/auth');



router.get('/edit/:id', withAuth, async(req, res) => {
    try {
        const requiredpost = await Post.findOne({
            where: {
                id: req.params.id,
                user_id: req.session.userId,
            },
        }, {
            attributes: ['title', 'body'],
        });

        res.render('edit-post', { requiredpost, layout: 'dashboard' });
    } catch (err) {
        res.status(500).json(err);
    }
});


router.get('/new', withAuth, async(req, res) => {

    res.render('new-post', { requiredpost, layout: 'dashboard' });

});



router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;