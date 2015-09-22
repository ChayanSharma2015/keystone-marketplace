var keystone = require('keystone');

exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res),
		locals = res.locals;

	view.query('products', keystone.list('Product').model.find().where('seller',req.user._id).sort('sortOrder'));
	
	view.render('myProducts');
}
