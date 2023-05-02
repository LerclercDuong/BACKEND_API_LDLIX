const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// mongoose.set('strictQuery', false);
const tvShows = new Schema(
    {
        movie:{
            _id:String,
            name: String, 
            origin_name: String,
            content: String,
            type: String,
            chieurap: Boolean,
            status: String,
            trailer_url: String,
            quality: String,
            lang: String,
            actor: Array, 
            category: Array,
            country: Array,
            thumb_url: String,
            poster_url: String,
            slug: String,
            year: Number
           },
           episodes:Array
    }
    ,{ typeKey: '$type' })

module.exports = mongoose.model('tvShows', tvShows);