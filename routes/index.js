//importing router express
const router = require('express').Router();
//importing all of the api routes
const apiRoutes = require('./api');

//prefixing api routes with api
router.use('/api', apiRoutes);


router.use((req, res) =>
{
    res.status(404).send('<h1>😝 404 Error!</h1>');
});
//exporting router 

module.exports = router;

