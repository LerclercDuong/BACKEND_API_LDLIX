const movies = require('../models/movies');
const phims = require('../models/phims');
const tvShows = require('../models/tvShows');
const singles = require('../models/singles');
const { MovieDb } = require('moviedb-promise')
const moviedb = new MovieDb('2c6f79941461abf6df2d3d5cabfc9f81')

const TYPE_LIST = ['Hành Động', 'Phiêu Lưu', 'Kinh Dị',
  'Hài Hước', 'Tâm Lý', 'Chính Kịch', 'Tài Liệu', 'Âm Nhạc', 'Tình Cảm', 'Phim 18+'];

const EN_TYPE_LIST = ['action', 'adventure', 'scary',
  'comedy', 'mentality', 'drama', 'documentary', 'music', 'love', 'adult'];

class Movies {
  static theloai = 34;
  getMoviesCategory(req, res, next) {
    const data = [];
    for (var element = 0; element < TYPE_LIST.length; element++) {
      data.push({ 'id': element, 'name': TYPE_LIST[element], 'en_name': EN_TYPE_LIST[element] });
    }
    res.json(data);
  }
  async getMovies(req, res, next) {
    let perPage = 10;
    let page = req.params.page;
    async function getMovies() {
      return movies.find({}).limit(perPage).skip((perPage * page) - perPage)
        .then(function (items) {
          return items;
        });
    }
    const Movies = await getMovies();
    for (let e of Movies) {
      await moviedb.searchMovie({ query: e.movie.origin_name })
        .then((res) => {
          if (res.results[0] !== undefined) {
            e.movie.thumb_url = `https://image.tmdb.org/t/p/original/${res.results[0].poster_path}`;
            e.movie.poster_url = `https://image.tmdb.org/t/p/original/${res.results[0].backdrop_path}`;
          }
        })
    }
    res.json(Movies);
  }

  async getTheaterMovies(req, res, next) {
    let perPage = 10;
    let page = req.params.page;
    async function getMovies() {
      return singles.find({ "movie.chieurap": { $eq: true } }).limit(perPage).skip((perPage * page) - perPage)
        .then(function (items) {
          return items;
        });
    }
    const Movies = await getMovies();
    // get smaller size poster from tmdb api 
    for (let e of Movies) {
      await moviedb.searchMovie({ query: e.movie.origin_name })
        .then((res) => {
          if (res.results[0] !== undefined) {
            e.movie.thumb_url = `https://image.tmdb.org/t/p/original/${res.results[0].poster_path}`;
            e.movie.poster_url = `https://image.tmdb.org/t/p/original/${res.results[0].backdrop_path}`;
          }
        })
    }
    res.json(Movies);

  }


  async getMoviesByCategory(req, res, next) {
    const CATEGORY = req.params.category;
    const CATEGORY_INDEX = EN_TYPE_LIST.indexOf(CATEGORY);
    let perPage = 10;
    let page = req.params.page;

    async function getMovies() {
      return singles.find({ "movie.category.name": { $eq: `${TYPE_LIST[CATEGORY_INDEX]}` } }).limit(perPage).skip((perPage * page) - perPage)
        .then(function (items) {
          return items;
        });
    }
    const Movies = await getMovies();
    for (let e of Movies) {
      await moviedb.searchMovie({ query: e.movie.origin_name })
        .then((res) => {
          if (res.results[0] !== undefined) {
            e.movie.thumb_url = `https://image.tmdb.org/t/p/original/${res.results[0].poster_path}`;
            e.movie.poster_url = `https://image.tmdb.org/t/p/original/${res.results[0].backdrop_path}`;
          }
        })
    }
    res.json(Movies);


  }



  getSingle(req, res, next) {
    const getSeries = phims.find({ "movie.type": { $eq: "series" } })
      .then(function (response) {

        const top = response.map(function (e, i) {
          return e;
        })
        console.log(top)
        return top;
      })
    async function getdata() {
      const seriesmovies = await getSeries;
      tvShows.insertMany(seriesmovies)


    }
    getdata()
    res.send('thanhcong')
  }
}


module.exports = new Movies;