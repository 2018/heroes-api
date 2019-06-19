// Import hero model
Hero = require('./heroModel');

// Handle index action
exports.index = function (req, res) {
    if (req.query.limit) {
        queryLimit(req, res);
    } else {
        getAll(req, res);
    }
};
getAll = function (req, res) {
    Hero.get(function (err, heroes) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json(formatCollection(heroes));
    });
};

// Handle dashboard action
queryLimit = function (req, res) {
    Hero.find(function (err, heroes) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json(formatCollection(heroes));
    }).limit(Number(req.query.limit));
};

// Handle create hero action
exports.new = function (req, res) {
    const hero = new Hero();
    hero.name = req.body.name ? req.body.name : hero.name;

// save the hero and check for errors
    hero.save(function (err) {
        if (err)
            res.json(err);
        res.json(formatEntity(hero));
    });
};

// Handle view hero info
exports.view = function (req, res) {
    Hero.findById(req.params.id, function (err, hero) {
        if (err)
            res.send(err);
        res.json(formatEntity(hero));
    });
};

// Handle update hero info
exports.update = function (req, res) {

    Hero.findById(req.params.id, function (err, hero) {
        if (err)
            res.send(err);

        hero.name = req.body.name ? req.body.name : hero.name;

// save the hero and check for errors
        hero.save(function (err) {
            if (err)
                res.json(err);
            res.json(formatEntity(hero));
        });
    });
};

// Handle delete hero
exports.delete = function (req, res) {
    Hero.remove({
        _id: req.params.id
    }, function (err) {
        if (err)
            res.send(err);

        res.json({
            status: "success",
            message: 'Hero successfully deleted!'
        });
    });
};

formatEntity = function (param) {
    return {
        id: param._id,
        name: param.name,
        create_date: param.create_date
    };
};

formatCollection = function (param) {
    return param.map((data) => {
        return {
            id: data._id,
            name: data.name,
            create_date: data.create_date
        }
    });
};
