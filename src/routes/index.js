const moviesRouter = require('./movies')
const seriesRouter = require('./tvShows')
const authenticate = require('./authentication')
const searchRouter = require('./search')

function route(app){
    app.use('/api/movies', moviesRouter);
    app.use('/api/category', moviesRouter);
    app.use('/api/series', seriesRouter);
    app.use('/api/authenticate', authenticate);
    app.use('/api/search', searchRouter);
}



module.exports = route;