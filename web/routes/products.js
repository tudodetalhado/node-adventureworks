var express = require('express');
var router = express.Router();


router.get('/', function(req, res) {
	req.dataService.getProducts(function(err,result){
		res.render('products', { title: 'Products page', products: result.products });
	});
 
});

router.get('/:id',function(req,res){
	var id = req.params.id;
	req.dataService.getProductByID(id,function(error,result){
		res.render('product', { title: 'Products details page', product: result.product });
	});
	
});

module.exports = router;