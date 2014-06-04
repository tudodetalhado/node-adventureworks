var tedious = require('tedious');
var _ 		= require('underscore');

module.exports = function(config){

	var Request = tedious.Request;
	var TYPES 	= tedious.TYPES;
	var ConnectionPool = require('tedious-connection-pool');
	var poolConfig = {};
	var pool = new ConnectionPool(poolConfig, config); 

	return{

			execQuery: function(sql, clb){
			
			var query = sql.query;
			var parameters = sql.parameters || [];
			
        pool.requestConnection(function(err,connection){
				if(err){ return clb(err,null);}
				
				var result = [];
				
				var req = new Request(query,function(err,count){
					connection.close();
					
					if(err){return clb(err,null);};
					clb(null,result);
				});

				_.each(parameters,function(param){
						req.addParameter(param.name,TYPES[param.type],param.value);

					});

				req.on('row',function(row){
					result.push(row);
					
				});

				req.on('done',function(rowCount,hasMore){
				
				});
						
				connection.execSql(req);
				

			});

			
		}

	};
};

