const { render } = require('ejs');
var express = require('express');
var router = express.Router();
var userModal = require('../modul/user');
var bcrypt = require('bcrypt');
/*Singup page. */
// get  mehod
router.get('/', (req, res, next) => {
    var loginUser = localStorage.getItem('loginUser');
    if (loginUser) {
        res.redirect('./deshboard');
    } else {
        res.render('singup', { title: 'singup', msg: '' });
    }
})
var checkUserName = function (req, res, next) {
    var name = req.body.uName
    var dbUserData = userModal.findOne({ username: name })
    dbUserData.exec((err, data) => {
      if (err) throw err
      if (data) {
        return res.render('singup', {
          title: 'singup',
          msg: 'Username already exit'
        })
      }
      return next()
    })
  }
  
  var checkPassword = function (req, res, next) {
    var password = req.body.password
    var cpassword = req.body.cPassword
    if (password != cpassword) {
      return res.render('singup', {
        title: 'singup',
        msg: 'password not a mach...'
      })
    }
    next()
  }
  var checkEmail = function (req, res, next) {
    var email = req.body.email
    var dbEmailData = userModal.findOne({ email: email })
    dbEmailData.exec((err, data) => {
      if (err) throw err
      if (data) {
        return res.render('singup', { title: 'singup', msg: 'Email already exit' })
      }
      next()
    })
  }
// post
router.post('/',checkUserName,checkEmail,checkPassword,(req, res, next) => {
        var uName = req.body.uName
        var uemail = req.body.email
        var upassword = req.body.password
        var bcryptpassword = bcrypt.hashSync(upassword, 10)
        var userDeails = new userModal({
            userName: uName,
            email: uemail,
            password: bcryptpassword
        })
        userDeails.save((err, data) => {
            if (err) throw err
            res.render('singup', { title: 'singup', msg: 'User register successfully' })
        })
    }
);
module.exports = router