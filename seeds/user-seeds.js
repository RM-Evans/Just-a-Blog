const { User } = require('../models');

const userData = [{
        username: 'cat',
        password: 'mouse'

    },
    {
        username: 'dog',
        password: 'bone'
    },
    {
        username: 'horse',
        password: 'oats'
    }
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;