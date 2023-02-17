Comparing CIDR Notations in JavaScript
please write a JavaScript function that will compare two array's of CIDR notations and return true if all of the addresses in the first array of CIDR notations would be included in the second array of CIDR notations

The initial implementation used a nested loop to compare each CIDR notation in the first array to every CIDR notation in the second array. While this approach worked for some cases, it did not handle disjoint ranges correctly.

that always seems to return true, for example:
if array1 is ["80.80.80.4/30","80.80.80.8/29","80.80.80.16/28","80.80.80.32/27","80.80.80.64/28","80.80.80.80/29","80.80.80.88/31","80.80.80.90/32"]
and array2 is ["80.80.80.70/31","80.80.80.72/29","80.80.80.80/28","80.80.80.96/30","80.80.80.100/32"]
this should return false, but it incorrectly returns true

To address this issue, we updated the implementation to convert each CIDR notation to a range tuple [start, end], and then check whether each range in the first array is completely contained in or overlaps with any range in the second array. However, this implementation also had issues with disjoint ranges.

still not working, I suspect that if you were to first find the start and end address of each CIDR, then combine to larger ranges if they are contiguous you would have better outcome

Finally, we discussed a better approach to the problem, which involved combining adjacent CIDR ranges in each array into larger ranges if they were contiguous. We then compared the combined ranges in both arrays to determine whether array1 is a subset of array2.

comparing array1 and array2 should return true, comparing array1 and array3 should return false

Here's the final implementation:

javascript
Copy code
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
 
