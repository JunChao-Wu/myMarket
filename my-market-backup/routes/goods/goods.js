const express = require('express');
const router = express.Router();

const pool =  require('../../dao/dbUtil');

const GoodsDao = require('../../dao/goodsDao')
const PurchaseDao = require('../../dao/purchaseDao')

// 添加goods
router.post('/addGoods', async (req, res) => {
  // 在purchase获取对应goods_name的category_id, 和所有stock之和
  // goods判断表中是否已存在一个名字的数据，有则不添加
  // goods添加goods_name, category_id, stock
  // 在purchase添加goods_id(待)  addObj = {goodsID, goodName}

  let goodsObj = {};
  let name = escape(req.body.goodName);
  goodsObj.name = name;
  let goodsDao = new GoodsDao(pool);
  let isExisted = await goodsDao.isExistedGoods(name)
  if (isExisted) {
    res.send({msg: 'goods is existed'})
    return;
  }
  let purchaseDao = new PurchaseDao(pool);
  // 计算当前goodName的总库存
  let stockArr = await purchaseDao.getGoodsStock(name);
  goodsObj.stock = stockArr.reduce((total, obj) => {
    return total += obj.stock;
  }, 0)
  // 获取对应category_id,只取第一个的分类类型
  let category_id_arr = await purchaseDao.getGoodsCategory(name);
  goodsObj.category_id = category_id_arr[0].categoryID;
  let result = await goodsDao.addGoods(goodsObj);

  let goodsIdObj = await goodsDao.getGoodsIdAndName(name);
  let result2 = await purchaseDao.addGoodsID(goodsIdObj);
  if (result && result2) {
    res.send({msg: 'add success'})
  }else if( !result ) {
    res.send({msg: 'add failed'})
  } else if ( !result2 ) {
    res.send({msg: 'update purchaseGoodsID failed'})
  }
})


// 获取goods
router.post('/getGoods', async (req, res) => {
  let getObj = req.body;
  getObj.start = (getObj.currentPage - 1) * getObj.pageSize;

  let goodsDao = new GoodsDao(pool);
  let results = await goodsDao.getGoods(getObj)
  console.log(results)
  if (results) {
    res.send(results)
  }else {
    res.send({msg: 'get failed'})
  }
})


// 删除goods
router.post('/deleteGoods', async (req, res) => {
  // 删除成功时，搜寻进货单中有goods_id的数据，置空
  let deleteObj = req.body;

  let goodsDao = new GoodsDao(pool);
  let result = goodsDao.deleteGoods(deleteObj.id);

  let purchaseDao = new PurchaseDao(pool);
  let isDeleted = purchaseDao.deleteGoodsID(deleteObj.id)

  if (result && isDeleted) {
    res.send({msg: 'delete success'});
  }else {
    res.send({msg: 'delete failed'});
  }
})










module.exports = router;
