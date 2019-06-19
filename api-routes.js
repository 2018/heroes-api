// Initialize express router
let router = require('express').Router();

// Set default API response
router.get('/', function (req, res) {
    res.json({
        status: 'API Its Working',
        message: 'Welcome to Heroes API.',
    });
});

// Import Heroes controller
var heroController = require('./heroController');

// Heroes routes

// router.route('/heroes/?limit').get(heroController.limit);

router.route('/heroes').get(heroController.index);

router.route('/hero').post(heroController.new);

router.route('/hero/:id')
    .get(heroController.view)
    .put(heroController.update)
    .delete(heroController.delete);


// Export API routes
module.exports = router;
