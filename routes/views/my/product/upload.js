var keystone = require('keystone'),
	Product = keystone.list('Product');

exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res),
		locals = res.locals;
	
	locals.section = 'uploadProduct';
	locals.formData = req.body || {};
	locals.validationErrors = {};
	locals.enquirySubmitted = false;
	
	view.on('post', { action: 'uploadProduct' }, function(next) {
		
		var application = new Product.model({
			seller : locals.user.id
		});

		var	updater = application.getUpdateHandler(req);

		updater.process(req.body, {
			flashErrors: true
		}, function(err) {
			if (err) {
				locals.validationErrors = err.errors;
			} else {
				locals.enquirySubmitted = true;
			}
			next();
		});
		
	});
	view.render('my/product/upload');
};