var _ = require('underscore');

module.exports = function(db){

	var mapCollection = function(data,fn,clb){
		var result = {};
        
		var collection = [];
		_.each(data,function(item){
			fn(item,function(dto){
				collection.push(dto)
			});
		});
        result.products = collection;
		return clb(result);
	};

	var mapProduct = function(data,clb){
		
		var product = {};
		product.id = data[0].value;
		product.name = data[1].value;
		product.product_number = data[2].value;
		product.list_price = data[3].value;
		return clb(product);
	};

	return{
		getProducts :function(clb){
			
			var sql = {};
			sql.query = "select productid,name,productnumber, listprice from [saleslt].[Product]";
			sql.parameters =[];

			db.execQuery(sql,function(error,result){
				if(error){
                  console.log(error);
                  return clb(error,null)};
                
				mapCollection(result,mapProduct, function(collection){
					return clb(null,collection);
				});
				
			});
		},
		getProductByID :function(id,clb){
			var sql = {};
			sql.query = "select productid,name,productnumber,listprice from [saleslt].[Product] where productid = @id";
			sql.parameters = [];
			sql.parameters.push({name:'id',type:'Int',value: id});

			db.execQuery(sql,function(error,result){
				if(error){
					console.log(error);
					return clb(error,null)
				};

				mapProduct(result[0], function(product){
				  var result = {};
                  result.product = product;
                  return clb(null,result);
				});
				
			});
		}
	};
}