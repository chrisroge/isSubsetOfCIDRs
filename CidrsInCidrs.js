function isSubsetOfCIDRs(cidrList, subsetList) {
  // Convert the list of CIDRs to IP ranges
  var ipRangeList = cidrList.map(function(cidr) {
    var parts = cidr.split('/');
    var ip = parts[0];
    var prefixLength = parseInt(parts[1]);
    var mask = (0xffffffff << (32 - prefixLength)) >>> 0;
    var start = (ip2long(ip) & mask) >>> 0;
    var end = (start + (1 << (32 - prefixLength))) >>> 0;
    return [start, end];
  });

  // Check if all IPs in the subset list are contained in the IP ranges
  return subsetList.every(function(cidr) {
    var parts = cidr.split('/');
    var ip = parts[0];
    var mask = (0xffffffff << (32 - parseInt(parts[1]))) >>> 0;
    var ipValue = ip2long(ip) >>> 0;
    return ipRangeList.some(function(range) {
      return (ipValue >= range[0] && ipValue < range[1]);
    });
  });

  // Helper function to convert an IP address to a long value
  function ip2long(ip) {
    return ip.split('.').reduce(function(ipInt, octet) {
      return (ipInt << 8) + parseInt(octet, 10);
    }, 0) >>> 0;
  }
}


var cidrList = ["80.80.80.4/30","80.80.80.8/29","80.80.80.16/28","80.80.80.32/27","80.80.80.64/28","80.80.80.80/29","80.80.80.88/31","80.80.80.90/32"];
var subsetList1 = ["80.80.80.20/30","80.80.80.24/30","80.80.80.28/31","80.80.80.30/32"];
var subsetList2 = ["80.80.80.70/31","80.80.80.72/29","80.80.80.80/28","80.80.80.96/30","80.80.80.100/32"];

console.log(isSubsetOfCIDRs(cidrList, subsetList1)); // should return true
console.log(isSubsetOfCIDRs(cidrList, subsetList2)); // should return false
