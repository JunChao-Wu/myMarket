const express = require('express');
const router = express.Router();

const pool =  require('../../dao/dbUtil');

const StockLimitDao = require('../../dao/stockLimitDao')

/* get warningLine */
router.post('/getWarningLine', async (req, res) => {
  let result ={};

  let stockLimitDao = new StockLimitDao(pool);
  let warning_line = await stockLimitDao.getStockLimit();
  if(warning_line) {
    result.stock_limit = warning_line.stock_limit;
    res.send(result)
  }else{
    res.send({msg: 'get failed'})
  }
})

/* eidt warningLine*/
router.post('/editWarningLine', async (req, res) => {
  let limit = req.body.warningLine;
  if(limit == null || limit == '') {
    res.send({msg: 'edit failed'})
  }
  let stockLimitDao = new StockLimitDao(pool);
  let result = await stockLimitDao.editStockLimit(limit) || false;
  if(result) {
    res.send({msg: 'edit success'})
  }else {
    res.send({msg: 'edit failed'})
  }
})

module.exports = router;
