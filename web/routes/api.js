var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.send('hello word');
});

router.get('/products',function(req,res){

 req.dataService.getProducts(function(err,result){
   
   res.send(result);
   
 });

});

module.exports = router;
