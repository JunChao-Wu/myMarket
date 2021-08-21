/* 判断数字 */
export const checkNumber = function (input) {
  let reg = /^\d+$/;
  return reg.test(input);
}

/* 判断手机号码 */
export const checkPhone = function (input) {
  let reg = /^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
  return reg.test(input);
}


/* 判断字母和数字 */
export const checkNumberletter = function (input) {
  let reg = /^[A-Za-z0-9]+$/;
  return reg.test(input);
}
