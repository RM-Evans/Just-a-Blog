const router = require('express').Router();

const apiRoutes = require('./api');

const homeRoutes = require('./home-routes.js');

const dashboardRoutes = require('./dash-routes');

router.use('/dashboard', dashboardRoutes);

router.use('/', homeRoutes);

router.use('/api', apiRoutes);

router.use((req, res) => {
    res.status(404).end();
});

module.exports = router;



// collecting the packaged group of API endpoints and prefixing them with the path /api