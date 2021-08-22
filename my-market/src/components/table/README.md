## **table参数说明**
参数名    |   类型  | 默认值| 是否必需|说明
----------|:------:|:-----:|:------:|---
dataSource|Array|——|是|渲染数据来源
isClearCheckbox|Boolean|——|否|当table里有checkbox组件时，可以从外部通过该参数清除所有checkbox选中状态
## **table事件**
事件名|回调参数|说明
------|:-----:|---
getCheckboxSeletions|存储选中的checkbox的值的数组|该事件在存储checkbox数组发生改变时触发

## **table-column参数说明**
参数名    |   类型  | 默认值| 是否必需|说明
----------|:------:|:-----:|:------:|---
type|String|default|否|区分列渲染的类型，可以为checkbox
label|String|空字符串|是|列的表头渲染来源
prop|String|——|是|列数据的渲染的属性名
width|String|——|是|列宽度，百分比或带px的字符串
