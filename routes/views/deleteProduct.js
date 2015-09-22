var keystone = require('keystone');
var Product = keystone.list('Product');

exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res),
		locals = res.locals;

	locals.formData = req.body || {};
	locals.validationErrors = {};
	locals.enquirySubmitted = false;

	
	view.on('post', { action: 'delete' }, function(next) {
		console.log("i am in controller  1");
		var product = Product.model.findOne().where('_id',req.body.product_id);
			product.exec(function(err,result){
				console.log('Result is : '+result);
				result.remove(next);
				});
			});
		});
	view.query('products', keystone.list('Product').model.find().where('seller',req.user._id).sort('sortOrder'));
	
	view.render('myProducts');
};
