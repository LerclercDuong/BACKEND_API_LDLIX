const phims = require('../models/phims');
const tvShows = require('../models/tvShows');


const TYPE_LIST = ['Hành Động', 'Phiêu Lưu', 'Kinh Dị', 
            'Hài Hước', 'Chính Kịch','Tài Liệu', 'Âm Nhạc', 'Tình Cảm','Phim 18+'];

const EN_TYPE_LIST = ['action', 'adventure', 'scary', 
            'comedy', 'Chính Kịch','documentary', 'music', 'love','adult'];            
class series{
   
        static theloai = 34;

    
    getSeriesByCategory(req, res ,next){
        tvShows.find({}).limit(10).then(function(data){
            console.log(data);
        })
         const CATEGORY = req.params.category;
         const CATEGORY_INDEX = EN_TYPE_LIST.indexOf(CATEGORY);
         let perPage = 10;
         let page = req.params.page;
        
        
         tvShows.find({"movie.category.name": {$eq: `${TYPE_LIST[CATEGORY_INDEX]}`}}).limit(perPage).skip((perPage * page) - perPage)
         .exec((err, items) => {
          tvShows.countDocuments((err, count) => { 
             if (err) return next(err);
             res.json(items) 
             });
         })
         
     }   
     
   
    
    getSingle(req,res,next) {
        const getSeries = phims.find({"movie.type": {$eq: "series"}})
        .then(function (response){
            
         const top = response.map(function (e, i){
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


module.exports = new series;