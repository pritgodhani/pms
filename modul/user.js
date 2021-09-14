var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/pms',{useNewUrlParser:true ,useCreateIndex:true, useUnifiedTopology: true});
var conn = mongoose.connection;
var singUpSchema = mongoose.Schema({
    userName:{type:String,
        require:true,
        index:{
            unique:true,
        }},
    email:{type:String,
        require:true,
        index:{
            unique:true,
        }},
    password:{type:String,
        require:true,
        },
    date:{
        type:Date,
        default:Date.now
    }
});
var singUpModel = mongoose.model('user',singUpSchema);
module.exports = singUpModel;