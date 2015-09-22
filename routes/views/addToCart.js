var keystone = require('keystone');
var User = keystone.list('User');
exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res),
		locals = res.locals;
	
	view.on('post', { action: 'cart' }, function(next) {
		
		var hello = User.model.findOne().where('cart',req.body.product_id);
		if(req.user.cart.indexOf(req.body.product_id) == -1)
		{
			req.user.cart.push(req.body.product_id);
			var updater = req.user.getUpdateHandler(req);
			updater.process(req.user, {
				fields : 'cart',
				flashErrors: true}, function(err) {
				if (err) {
					locals.validationErrors = err.errors;
					next();
				} else {
					next();
				}
			});
		}
		else
		{
			req.flash('error', 'This product has been already added to cart');
			next();
		}
	});
	view.query('userCart', keystone.list('User').model.findOne().where('_id',req.user._id).populate('cart'));
	view.render('myCart');
}