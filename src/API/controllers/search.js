const singles = require('../models/singles');

class Search{
    findByName(req, res, next) {
        const name = req.params.slug;
        singles.findOne({'movie.slug': name}).then(function(results) {
            res.json(results);
        })
    }
}

module.exports = new Search;