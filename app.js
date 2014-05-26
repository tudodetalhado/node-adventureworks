var config = {
	userName: 'adw',
	password: 'adw',
	server: 'FBECKER-PC',
	options:{
		database: 'AdventureWorks2008R2',
		instanceName:'DEV2008R2'

	}
};

var SqlDb = require('./data/sql_db');
var sqlDb = new SqlDb(config);
var Repository = require('./data/repository');
var repository = new Repository(sqlDb);
var DataService = require('./data/data_service');

var service = new DataService(repository);

/*var sql = {}
sql.parameters = [];
sql.query = "Select top 10 ProductID, Name, ProductNumber from [Production].[Product]";

sqlDb.execQuery(sql,function(err,result){
	console.log(result);
});*/

/*repository.getProducts(function(error,result){
	console.log(result);
});*/



/*repository.getProductByID(1,function(err,result){
	console.log(result);
});*/

service.getProducts(function(err,result){
	console.log(result);
});

service.getProductByID(2,function(err,result){
	console.log(result);
})