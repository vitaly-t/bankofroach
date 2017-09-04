var express = require('express');
var router = express.Router();

var request = require('request');

/* GET home page. */

router.get('/', function(req, res) {

	  res.render('index',
	  	{ 
	  		title: 'Accounts', 
	  		id: 'accounts'
	  	});
	});

router.get('/create-account', function(req, res) {
  res.render('create-accounts', { title: 'Add Account' });
});

module.exports = router;
