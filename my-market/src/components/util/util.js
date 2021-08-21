export const _typeOf = function(data) {
  let reg = /^\[object (\w+)\]/;
  let value = reg.exec(Object.prototype.toString.call(data));
  return value[1];
}

export const hasOwnProp =  function(obj, key) {
  return Object.prototype.hasOwnProperty.call(obj, key)
}

export const deepCloneObject =  function(oldObj) {
  const newObj = {};
  for(let key in oldObj) {
    let value = oldObj[key];
    if(_typeOf(value) == 'Object') {
      newObj[key] = deepCloneObject(value);
    }else {
      newObj[key] = value
    }
  }
  return newObj;
}

export const cloneData = function(defaults) {
  const options = [];
  defaults.forEach(obj => {
    options.push(deepCloneObject(obj));
  });
  return options;
}