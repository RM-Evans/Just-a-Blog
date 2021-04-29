const { Post } = require('../models');

const postData = [{
    title: 'USER 1 test post',
    post_body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    user_id: 1

},
{
    title: 'USER 2 test post',
    post_body: 'Amet aliquam id diam maecenas ultricies mi eget mauris pharetra.',
    user_id: 2
},
{
    title: 'USER 3 test post',
    post_body: 'Ut etiam sit amet nisl purus in mollis.',
    user_id: 3
}
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;