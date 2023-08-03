# 记一次线上笔试 Test

## 1、css 布局

...略

## 2、字符串隐藏部分内容 说明：实现一个方法，接收一个字符串和一个符号，将字符串中间四位按指定符号隐藏 符号无指定时使用星号（\*） 接收的字符串小于或等于四位时，返回同样长度的符号串，等同于全隐藏，如 123，隐藏后是 **\* 字符串长度是大于四位的奇数时，如 123456789，隐藏后是 12\*\***789，奇数多出来的一位在末尾，请用 js 实现，函数 function mask(str, char = '_') {/_ 补充代码实现 \*/

```js
function mask(str, ch = "*") {
  const len = str.length,
    n = len >> 1;
  return len <= 4
    ? ch.repeat(len)
    : [...str].map((str, i) => (i >= n - 2 && i <= n + 1 ? ch : str)).join("");
}

function mask(str, ch = "*") {
  const len = str.length,
    //   使用右移 >> 符号快速得到字符串长度的一半，(奇数则向下取整)
    n = len >> 1;
  // 三元运算符，当字符串长度小于等于4，直接返回全部隐藏后的符号
  // 否则将其转换为字符数组，利用 map 方法处理字符串
  // 当 && 条件成立时，使用 ch 隐藏符号替换，否则使用原本字符串
  return len <= 4
    ? ch.repeat(len)
    : [...str].map((s, i) => (i >= n - 2 && i <= n + 1 ? ch : s)).join(""); // s 代表当前值, i 代表索引
}

// 测试
console.log(mask("123456789", "$")); // 12$$$$789
```

## 3、实现一个对象属性取值

```js
function getPropertyValue(obj, propertyString) {
  // 将属性字符串拆分为属性名数组
  const properties = propertyString.split(".");

  // 遍历属性名数组，逐级获取属性值，对象属性可以通过 obj['objName'] 来取值
  let value = obj;
  for (const prop of properties) {
    value = value[prop];
    // 如果当前属性值为 undefined 或 null，则返回 undefined
    if (value === undefined || value === null) {
      return undefined;
    }
  }

  return value;
}

// 示例对象
const person = {
  name: "John",
  age: 30,
  address: {
    city: "New York",
    country: "USA",
  },
};

// 测试
console.log(getPropertyValue(person, "name")); // 输出: John
console.log(getPropertyValue(person, "age")); // 输出: 30
console.log(getPropertyValue(person, "address.city")); // 输出: New York
```

## 4、实现 compare 方法，比较两个版本号的大小，版本号规则 x.y.z，xyz 均为大于等于 0 的整数

```js
// 版本号相等返回0, version1大于version2返回1, version2大于version1返回0
function compare(version1, version2) {
  // 将版本号字符串解析为三个整数
  const [x1, y1, z1] = version1.split(".").map(Number);
  const [x2, y2, z2] = version2.split(".").map(Number);

  // 比较x部分
  if (x1 !== x2) {
    return x1 - x2;
  }

  // 比较y部分
  if (y1 !== y2) {
    return y1 - y2;
  }

  // 比较z部分
  return z1 - z2;
}
```

## 5、用数组的 filter, map, reduce 方法对以下数据做处理，使得输出结果为 '256'

```js
const arys = [{ a: 6 }, { a: 1 }, { a: 5 }, { a: 2 }];
// 1. 首先 filter 过滤出属性 a 值为 1 的对象
// 2. map 方法进行映射把每个对象里的 a 值取出
// 3. 此时 result = [6, 5, 2]; 之后用 sort 方法进行排序，再转为字符串得到结果 '256'
let result = arys.filter((ary) => ary.a !== 1).map((element) => element.a);
console.log(result.sort().join(""));
```

## 6、parseBytes 的实现，将一个表示文件大小的字符串转换成最终的数字，这个数字表示文件的 byte 数大小

```js
function parseBytes(sizeString) {
  // 创建一个正则表达式来匹配数值和单位部分
  const sizeRegex = /^(\d+(\.\d+)?)\s*([BKMGTPEZY]B?)$/i;

  // 使用正则表达式匹配字符串
  const matches = sizeString.match(sizeRegex);

  if (!matches) {
    throw new Error('Invalid size format. Please use a format like "100MB".');
  }

  // 获取数值部分和单位部分
  const value = parseFloat(matches[1]);
  const unit = matches[3].toUpperCase();

  // 定义单位对应的字节数
  const unitsInBytes = {
    B: 1,
    KB: 1024,
    MB: 1024 ** 2,
    GB: 1024 ** 3,
    TB: 1024 ** 4,
    PB: 1024 ** 5,
    EB: 1024 ** 6,
    ZB: 1024 ** 7,
    YB: 1024 ** 8,
  };

  // 检查单位是否有效
  if (!unitsInBytes[unit]) {
    throw new Error(
      "Invalid unit. Please use one of the following units: B, KB, MB, GB, TB, PB, EB, ZB, YB."
    );
  }

  // 计算最终文件大小
  const fileSizeInBytes = value * unitsInBytes[unit];
  return fileSizeInBytes;
}
```

## 7、使用 js 实现一个深拷贝操作，请不要使用‘JSON.stringify’

```js
// 参数初始值为空对象
const copyObj = (obj = {}) => {
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
```
