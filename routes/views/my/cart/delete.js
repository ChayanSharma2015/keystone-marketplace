var keystone = require('keystone');
var User = keystone.list('User');

exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res),
		locals = res.locals;

	view.on('post', { action: 'cart' }, function(next) {
		var index = req.user.cart.indexOf(req.body.cartItem_id);
		if (index > -1) {
	    	req.user.cart.splice(index, 1);
		}
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
	});
	
	view.query('userCart', keystone.list('User').model.findOne().where('_id',req.user._id).populate('cart'));
	view.render('my/cart/myCart');
};