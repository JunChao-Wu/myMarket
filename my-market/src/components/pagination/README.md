## **pagination参数说明**
参数名|类型|默认值|可选值|说明
---|:---:|:---:|:---:|---
total|Number|——|——|数据总量，渲染总数来源
pageSize|Number|10|大于0|单页包含数据量
currentPage|Number|1|——|当前页

## **pagination事件**
事件名|回调参数|说明
---|:---:|---
current-change|一个对象包含currentPage和pageSize|页面改变时会触发