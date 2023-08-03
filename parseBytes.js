export default function parseBytes(sizeString) {
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

// 示例用法
// const sizeString = "2.5GB";
// const bytes = parseBytes(sizeString);
// console.log(`文件大小为 ${bytes} 字节`);

// (4) ['2.5GB', '2.5', '.5', 'GB', index: 0, input: '2.5GB', groups: undefined]
// console.log(matches);
