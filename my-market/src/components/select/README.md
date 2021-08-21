## **eSelect参数说明**
参数名    |   类型  | 默认值| 是否必需|说明
----------|:------:|:-----:|:------:|---
width     | String | 187px |    否  | 控制select的宽度
height    | String | 30px  |    否  | 控制select的高度
initOption| Object | ——    |    否  | 提供select的初始选择数据数据
optionList| Array  | ——    |    是  | select的渲染数据来源



## **eSelect事件**
事件名|回调参数|说明
------|:-----:|---
handlerChoosed|当前选中的值|选中的值改变时就会触发



## **对initOption和optionList的补充说明**
参数名|说明
---|---
optionList| 是一个对象数组，对象包含id和name两个属性
iniOption|  是一个对象，对象包含id和name两个属性


> **注意：** 因文件名与html标签相同，因此在引入时注意适当修改组件名称
