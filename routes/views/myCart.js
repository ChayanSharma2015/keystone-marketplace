var keystone = require('keystone');

exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res),
		locals = res.locals;
		
	view.query('userCart', keystone.list('User').model.findOne().where('_id',req.user._id).populate('cart'));	
	view.render('myCart');
}	