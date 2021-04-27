const withAuth = (req, res, next) => {
    if (!req.session.user_id) {
        res.redirect('/login');
    } else {
        next();
    }
};

module.exports = withAuth;

//authenticate that user is logged in, otherwise redirect to login page


//add to approprate get requests -- dashboard routes? -- add in routes