const router = require('express').Router();
const { Comment } = require('../../models');


//get all comments 
router.get('/', (req, res) => {
    Comment.findAll({
        attributes: [
            'id',
            'comment_text',
            'user_id',
            'post_id'
        ],
        order: [['created_at', 'DESC']]
    })
        .then(commentData => res.json(commentData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
});

//create comment
router.post('/', (req, res) => {
    if (req.session) {
        const { comment_text, post_id = [] } = req.body;
        Comment.create({
            comment_text: comment_text,
            post_id: post_id,
            user_id: req.session.user_id
        })
            .then(commentData => res.json(commentData))
            .catch(err => {
                res.status(400).json(err);
            });
    }
});


//update comment
router.put('/:id', (req, res) => {
    Comment.update(req.body,
        {
            where: {
                id: req.params.id
            }
        }
    )
        .then(commentData => {
            if (!commentData[0]) {
                res.status(404).json({ message: "no comment found" });
                return;
            }
            res.json(commentData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });

});





module.exports = router;