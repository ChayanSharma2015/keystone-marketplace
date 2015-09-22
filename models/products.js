var _ = require('lodash'),
	keystone = require('keystone'),
	Types = keystone.Field.Types;

var Product = new keystone.List('Product', {
	// use nodelete to prevent people from deleting the demo admin user
	nodelete: true
});

Product.add({
	title: { type: String, initial: false, required: true, index: true },
	description: { type: String, initial: false, required: true, index: true },
	price: { type: String, initial: false, required: true, width: 'short' },
	image: { type: Types.CloudinaryImage, initial: false, required: true},
	seller: { type: Types.Relationship, ref: 'User', index: true, initial: false }
});

Product.track = true;
Product.register();