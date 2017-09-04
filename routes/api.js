var express = require('express');
var router = express.Router();
var debug = require('debug')('api');

var db = require('./modules/db');

/******
INSERT
******/
router.post('/insert', function(req, res){

  async function insert(){

    debug(req.body);

    let data = {
        name: req.body.accountName, 
        balance: Number(req.body.accountBalance)
      };

    let query = {
        text: 'INSERT INTO bank.accounts (name, balance) VALUES($1, $2);',
        values: [data.name, data.balance]
      };

    try {
      results = await db.query(query);
      res.send(results);
    } 
    catch(error) {
      debug(error);
      return res.status(500).json({success: false, data: error});
    };

  }

  insert();

});

/******
BALANCES
******/

router.get('/balances', function(req, res){

  async function balances(){

    let data = {
        id: req.body.id
      };

    let query = {
        text: 'SELECT name, balance FROM bank.accounts;'
      };

    try {
      results = await db.query(query);
      res.send(results);
    }

    catch(error) {
      debug(error);
      return res.status(500).json({success: false, data: error});
    };
  
  }

  balances();

});

/******
MORE MONEY
******/

router.post('/more-money', function(req, res){

  async function moremoney(){

	  try {

	    results = await db.tx(t => {
        // this.ctx = transaction config + state context;
        return t.batch([
            t.none('UPDATE accounts SET balance = balance * 1.05;'),
            t.query('SELECT name, balance FROM bank.accounts;')
        ]);
    	});
	
		  res.send(results);
	  
	  } 
	  catch(error) {
	    debug(error);
	    return res.status(500).json({success: false, data: error});
	  };

  }

  moremoney();
	  
});


module.exports = router;
