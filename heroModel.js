const mongoose = require('mongoose');

// Setup schema
const heroSchema = mongoose.Schema({
    id: {
        type: String,
        required: false
    },
    name: {
        type: String,
        required: true
    },
    create_date: {
        type: Date,
        default: Date.now
    }
});

// Export Hero model
const Hero = module.exports = mongoose.model('heroes', heroSchema);

module.exports.get = function (callback, limit) {
    Hero.find(callback).limit(limit);
};
