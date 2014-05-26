module.exports = function(repository){

	return{
		getProducts:function(clb){
			repository.getProducts(function(err,products){
				if(err){return clb(err,null);}
				return  clb(null,products);
			});
		},
		getProductByID:function(id,clb){
			repository.getProductByID(id,function(err,product){
				if(err){return clb(err,null);}
				return  clb(null,product);
			});	
		}

	};

}