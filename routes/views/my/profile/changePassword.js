var keystone = require('keystone');
var User = keystone.list('User');
var crypto = require('crypto');

exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res),
		locals = res.locals;
	
	locals.section = 'user';

	view.on('post', { action: 'editPassword' }, function(next) {

		var updater = req.user.getUpdateHandler(req);

		req.user._.password.compare(req.body.oldPassword, function(err, isMatch) {
			if (!err && isMatch) {
				updater.process(req.body, {
					fields : 'password',
					flashErrors: true}, function(err) {
					if (err) {
						locals.validationErrors = err.errors;
					} else {
						locals.enquirySubmitted = true;
					}
					next();
				});
			} 
			else {
				req.flash('error', 'Sorry! Your entered incorrect old password, please try again.');
				next(err);
			}
		});
	});
	view.render('my/profile/changePassword');
}
 