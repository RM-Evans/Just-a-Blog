const router = require('express').Router();
const { User, Post, Comment } = require('../models');
//const withAuth = require('../utils/auth');

router.get('/', (req, res) => {
    console.log(req.session);

    Post.findAll({
        where: {
            creator_id: req.session.user_id
        },
        order: [['created_at', 'DESC']],
        include: [
            {
                model: User,
                attributes: ['username']
            },
            {
                model: Comment,
                attributes: ['content', 'user_id'],
                include: [
                    {
                        model: User,
                        attributes: ['username']
                    }
                ]
            }
        ]
    })
        .then(postData => {
            const posts = postData.map(post => post.get({ plain: true }));
            res.render('dashboard', { posts, loggedIn: true });
        }).
        catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// Edit a post
router.get('/edit/:id', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'title',
            'creator_id',
            'content',
            'created_at',
        ],
        include: [
            {
                model: Comment,
                attributes: ['content', 'user_id', 'post_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    }).
        then(postData => {
            if (postData) {
                const post = postData.get({ plain: true });

                res.render('edit-post', {
                    post,
                    loggedIn: req.session.loggedIn
                });
            } else {
                res.status(404).end();
            }
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

module.exports = router;