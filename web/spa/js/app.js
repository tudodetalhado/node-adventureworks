App = Ember.Application.create();
App.Store = DS.Store.extend({
  adapter: DS.RESTAdapter.create({
    url: '/api'
  })
});
App.Product = DS.Model.extend({
  name: DS.attr('string'),
  product_number: DS.attr('string'),
  list_price: DS.attr('string')
});


App.Router.map(function() {
  this.resource('products');
  this.resource('product', { path: '/products/:product_id' });
});

App.IndexRoute = Ember.Route.extend({
 
});

App.ProductsRoute = Ember.Route.extend({
  model:function(){
    return App.Product.find();
  }
  
  
});

App.ProductRoute = Ember.Route.extend({
  model:function(params){
    return App.Product.find(params.product_id); 
  }
});

App.ProductsController = Em.ArrayController.extend({
  itemController: 'item',
  searchText:'',
  extractSearch:function(){
    var searchText = this.get('searchText');
    var regExp = new RegExp(searchText,'gi');
   this.set('model',App.Product.filter(function(i){
    return regExp.test(i.get('name')) || regExp.test(i.get('product_number'));
    }));
  },
  searchTextObserver: function(){
   
    Ember.run.debounce(this, this.extractSearch, 250);     
        
    }.observes('searchText')
 
});

App.ItemController = Em.ObjectController.extend({
  needs: 'products',
  searchText: Em.computed.alias('controllers.products.searchText')
  
});


Ember.Handlebars.registerBoundHelper('marker', function(text,searchWord,options) {
   var regExp = new RegExp(searchWord,'gi');
   var replacer = '<span class="highlight">$&</span>';
   var result =  text.replace(searchWord, replacer);
  return new Handlebars.SafeString(result);
});