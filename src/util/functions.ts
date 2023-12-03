export function getMultipleIndexOf(
  str: string,
  searchQuery: string,
  acc: number = 0,
  result: any[] = [],
) {
  if (!str || !searchQuery) {
    return { result, acc };
  }
  const foundIndex = str.toLowerCase().indexOf(searchQuery.toLowerCase());
  if (foundIndex < 0) {
    return { result, acc };
  }
  return getMultipleIndexOf(
    str.slice(foundIndex + searchQuery.length),
    searchQuery,
    acc + foundIndex + searchQuery.length,
    [...result, acc + foundIndex],
  );
}

export function isNum(c: string) {
  return /^\d+$/g.test(c);
}

export function extractWrittenNumbers(line: string, nums: any[]) {
  getMultipleIndexOf(line, 'one').result.forEach((i) => nums.push({ i, num: '1', written: true }));
  getMultipleIndexOf(line, 'two').result.forEach((i) => nums.push({ i, num: '2', written: true }));
  getMultipleIndexOf(line, 'three').result.forEach((i) => nums.push({ i, num: '3', written: true }));
  getMultipleIndexOf(line, 'four').result.forEach((i) => nums.push({ i, num: '4', written: true }));
  getMultipleIndexOf(line, 'five').result.forEach((i) => nums.push({ i, num: '5', written: true }));
  getMultipleIndexOf(line, 'six').result.forEach((i) => nums.push({ i, num: '6', written: true }));
  getMultipleIndexOf(line, 'seven').result.forEach((i) => nums.push({ i, num: '7', written: true }));
  getMultipleIndexOf(line, 'eight').result.forEach((i) => nums.push({ i, num: '8', written: true }));
  getMultipleIndexOf(line, 'nine').result.forEach((i) => nums.push({ i, num: '9', written: true }));
}
