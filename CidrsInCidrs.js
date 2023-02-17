function compareCIDRArrays(array1, array2) {
  // convert CIDR notation to [start, end] range
  function cidrToRange(cidr) {
    const [ip, mask] = cidr.split('/');
    const ipInt = ip.split('.').reduce((acc, val) => (acc << 8) + parseInt(val), 0);
    const maskInt = (-1 << (32 - parseInt(mask))) >>> 0;
    const start = ipInt & maskInt;
    const end = start + (~maskInt >>> 0);
    return [start, end];
  }

  // combine adjacent ranges in array
  function combineRanges(array) {
    // sort ranges by start address
    array.sort((a, b) => a[0] - b[0]);
    const result = [array[0]];
    for (let i = 1; i < array.length; i++) {
      const prevRange = result[result.length - 1];
      const currRange = array[i];
      if (prevRange[1] + 1 >= currRange[0]) {
        // combine adjacent ranges
        prevRange[1] = Math.max(prevRange[1], currRange[1]);
      } else {
        result.push(currRange);
      }
    }
    return result;
  }

  const ranges1 = combineRanges(array1.map(cidrToRange));
  const ranges2 = combineRanges(array2.map(cidrToRange));

  let i = 0;
  let j = 0;

  // loop until we reach the end of one of the arrays
  while (i < ranges1.length && j < ranges2.length) {
    const range1 = ranges1[i];
    const range2 = ranges2[j];

    if (range1[0] >= range2[0] && range1[1] <= range2[1]) {
      // range1 is completely contained in range2
      i++;
    } else if (range2[0] >= range1[0] && range2[1] <= range1[1]) {
      // range2 is completely contained in range1
      j++;
    } else if (range1[1] < range2[0]) {
      // range1 is entirely to the left of range2
      return false;
    } else if (range2[1] < range1[0]) {
      // range2 is entirely to the left of range1
      return false;
    } else {
      // there is overlap but no containment
      return false;
    }
  }

  // if we reached the end of array1 but not array2, array1 is not a subset of array2
  if (i === ranges1.length && j < ranges2.length) {
    return false;
  }

  return true;
}
