const express = require('express')
const router = express.Router();

const pool =  require('../../dao/dbUtil');


const CategoryDao = require('..//../dao/categoryDao')


/* 添加 分类 */
router.post('/addCategory', async (req, res) => {
  let obj = req.body;
  let categoryDao = new CategoryDao(pool);
  let result =  await categoryDao.addCategory(obj.name);
  if(result) {
    res.send({msg: 'add success'})
  }else {
    res.send({msg: 'add failed'})
  }
})

/* 删除 分类 */
router.post('/deleteCategory', async (req, res) => {
  let obj = req.body;
  // console.log(obj)
  if(obj.id == null || obj.id == '') {
    res.send({msg: 'delete failed'})
  }
  let categoryDao = new CategoryDao(pool);
  let result = await categoryDao.deleteCategory(obj.id);
  if(result) {
    res.send({msg: 'delete success'})
  }else {
    res.send({msg: 'delete failed'})
  }
})

/* 获取 分类 */
router.post('/getCategory', async (req, res) => {
  let categoryDao = new CategoryDao(pool);
  let resultList = await categoryDao.getCategory();
  if(resultList) {
    res.send(resultList)
  }else {
    res.send({msg: 'get failed'})
  }
})


module.exports = router;