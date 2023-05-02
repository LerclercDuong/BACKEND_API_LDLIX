const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const phimbos = new Schema(
    {
        movie: {
            name: String,
            content: String
         
        }
    }
)

module.exports = mongoose.model('phimbos', phimbos)