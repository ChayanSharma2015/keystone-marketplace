var _ = require('lodash'),
	keystone = require('keystone'),
	importRoutes = keystone.importer(__dirname);

function restrictToAdmins(req, res, next) {
	if (req.user && req.user.isAdmin) {
		next();
	} else {
		res.redirect('/signin');
	}
}

keystone.pre('routes', function(req, res, next) {
	
	res.locals.navLinks = [];
	
	res.locals.user = req.user;
	
	next();
	
});

keystone.pre('render', function(req, res, next) {
	
	var flashMessages = {
		info: req.flash('info'),
		success: req.flash('success'),
		warning: req.flash('warning'),
		error: req.flash('error')
	};
	
	res.locals.messages = _.any(flashMessages, function(msgs) { return msgs.length }) ? flashMessages : false;
	
	next();
	
});

keystone.set('404', function(req, res, next) {
	res.status(404).render('errors/404');
});

// Load Routes
var routes = {
	//api: importRoutes('./api'),
	download: importRoutes('./download'),
	views: importRoutes('./views')
};

exports = module.exports = function(app) {
	
	// Views
	app.get('/', routes.views.index);
	app.get('/blog/:category?', routes.views.blog);
	app.all('/blog/post/:post', routes.views.post);
	app.get('/gallery', routes.views.gallery);
	app.all('/contact', routes.views.contact);
	app.all('/products', routes.views.products);
	app.all('/register', routes.views.register);
	app.all('/signin', routes.views.signin);

	app.all('/my/profile', routes.views.my.profile.myProfile);
	app.all('/my/profile/edit', routes.views.my.profile.edit);
	app.all('/my/password', routes.views.my.profile.changePassword);
	app.all('/signout', routes.views.my.profile.signout);

	app.all('/my/shop', routes.views.my.product.shop);
	app.all('/my/products', routes.views.my.product.list);
	app.all('/my/products/upload', routes.views.my.product.upload);
	app.all('/my/products/edit', routes.views.my.product.edit);
	
	app.all('/my/cart', routes.views.my.cart.myCart);
	app.all('/my/cart/add', routes.views.my.cart.add);
	app.all('/my/cart/delete', routes.views.my.cart.delete);
	
	
	
	// Downloads
	app.get('/download/users', routes.download.users);
	
	// API
	//app.all('/api*', keystone.initAPI);
}
