const mongoose = require('mongoose');

function connect() {
    mongoose.connect('mongodb+srv://doantri2003:doantri123@cluster1.etpb2ti.mongodb.net/webphim')
    .then(function(){
     console.log('Connected')
    }) .catch(function(e){
     console.log('Failed to connect')
    })
 }
 

module.exports = {connect};