var express = require('express');
var router = express.Router();
var apiCatDataModel = require('../modul/addNewcategory');
// var apiData = apiCatDataModel.find({});
router.get('/',(req, res, next) => {
   var apiData = apiCatDataModel.find({},{'categoryName':1});
apiData.exec((err, data) => {
   
   if (err) throw err;
   res.send('Node js Restfull API GET Method Working'+data);
   
 });
 
 })
router.post('/',(req, res, next) => {
   var catName = req.body.name;
   var catData = new apiCatDataModel({
      categoryName:catName
   });
   catData.save((err,data)=>{
      if(err) throw err;
      res.send('insert successfuly...Node js Restfull API GET Method Working');
   })

 })
router.put('/prit/:id',(req, res, next) => {
   var did = req.params.id;
   var catname = req.body.category;
   apiCatDataModel.findById(did,(err,data)=>{
      (data);
      if(err) throw err
data.categoryName=catname?catname:data.categoryName;
data.save((err,data)=>{
   if(err) throw err;
   res.send('Node js Restfull API PUT Method Working');
});
   });
 
 })
router.patch('/:id',(req, res, next) => {
   var did = req.params.id;
   var catname = req.body.category;
   apiCatDataModel.findById(did,(err,data)=>{
      console.log(data);
      if(err) throw err
data.categoryName=catname?catname:data.categoryName;
data.save((err,data)=>{
   if(err) throw err;
   res.send('Node js Restfull API PATCH Method Working');
});
   });
 
 })
router.delete('/',(req, res, next) => {
   res.send('Node js Restfull API GET Method Working');
})
module.exports = router;