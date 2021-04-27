const { Comment } = require('../models');

const commentData = [{
    comment_text: "USER 1 comment on POST 1",
    user_id: 1,
    post_id: 1
},
{
    comment_text: "USER 2 comment on POST 2",
    user_id: 2,
    post_id: 2
},
{
    comment_text: "USER 3 comment on POST 3",
    user_id: 3,
    post_id: 3
}
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;