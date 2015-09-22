var keystone = require('keystone');
var Product = keystone.list('Product');

exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res),
		locals = res.locals;

	locals.formData = req.body || {};
	locals.validationErrors = {};
	locals.enquirySubmitted = false;

	view.on('post', { action: 'edit' }, function(next) {
		var displayProduct = Product.model.findOne().where('_id',req.body.product_id);
			displayProduct.exec(function(err,result){
				locals.productDetails = result;
				next();
			});
		});

	view.on('post', { action: 'delete' }, function(next) {
		console.log("i am in controller  1");
		var product = Product.model.findOne().where('_id',req.body.product_id);
			product.exec(function(err,result){
				console.log('Result is : '+result);
				result.remove(function(err){
					if(err) console.log(err);
					else res.redirect('/my/products');
				});
			});
		});

	view.on('post', { action: 'update' }, function(next) {
		
		var product = Product.model.findOne().where('_id',req.body.product_id);
			product.exec(function(err,result){
				var updater = result.getUpdateHandler(req);
				updater.process(req.body, {
				flashErrors: true}, function(err) {
				if (err){
					locals.validationErrors = err.errors;
				}
				else{ 
					locals.enquirySubmitted = true;
				}
				next();
			});
		});
	});
	
	view.render('editProduct');
};
