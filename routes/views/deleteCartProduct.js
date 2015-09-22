var keystone = require('keystone');
var User = keystone.list('User');

exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res),
		locals = res.locals;

	view.on('post', { action: 'cart' }, function(next) {
		//req.user.cart.pop(req.body.cartItem._id);
		console.log('CART ITEM : '+req.body.cartItem_id);
		/*req.user.cart.stackoverflow_remove(req.body.cartItem_id);
		next();*/

		/*if (!Array.prototype.remove) {
 			Array.prototype.remove = function(val) {
    		var i = this.indexOf(val);
        	return i>-1 ? this.splice(i, 1) : [];
  			};
		}*/
		/*req.user.cart.splice(req.body.cartItem_id);
		next();*/
		var index = req.user.cart.indexOf(req.body.cartItem_id);
		console.log('INDEX : '+index);
		console.log('CART : '+req.user.cart);
		if (index > -1) {
	    	req.user.cart.splice(index, 1);
		}
		console.log('CART : '+req.user.cart);
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


		/*var hello = User.model.findOne().where('cart._id',req.body.cartItem_id);
		console.log('Hello : '+hello)
		hello.exec(function(err,result){
			console.log('Result : '+result);
			result.remove(function(err){
				if(err) console.log(err);
				else next();
			});
		});*/
	});
	view.query('userCart', keystone.list('User').model.findOne().where('_id',req.user._id).populate('cart'));
	view.render('myCart');
};