// 参数初始值为空对象
export default copyObj = (obj = {}) => {
  // 变量先置空
  let newobj = null;

  // 判断是否需要继续进行递归
  // null 和 数组 的数据类型都为数组: typeof(null) == 'object'; typeof([]) == 'object'
  if (typeof obj == "object" && obj !== null) {
    // 判断用哪种数据类型接收 (传入的参数可能是对象或数组)
    newobj = obj instanceof Array ? [] : {};
    // 进行下一层递归克隆
    for (var i in obj) {
      // obj['key'] 对象类型利用 key 值可以在 '[]' 内取值
      // i 代表 key 值, 之后递归判断其值是否为对象类型，如果是则继续递归遍历获取值
      newobj[i] = copyObj(obj[i]);
    }
    // 如果不是对象直接赋值
  } else newobj = obj;

  return newobj;
};
// Source: https://juejin.cn/post/7109843641677398053
