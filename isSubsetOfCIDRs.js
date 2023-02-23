function isSubsetOfCIDRs(cidrList, subsetList) {
  // Convert the list of CIDRs to IP ranges
  var ipRangeList = cidrList.map(function(cidr) {
    var parts = cidr.split('/');
    var ip = parts[0];
    var prefixLength = parseInt(parts[1]);
    var mask = (0xffffffff << (32 - prefixLength)) >>> 0;
    var start = (ip2long(ip) & mask) >>> 0;
    var end = (start + (1 << (32 - prefixLength))) >>> 0;
    return [start, end, cidr];
  });

  // Check if all IPs in the subset list are contained in the IP ranges
  var invalidCIDRs = subsetList.filter(function(cidr) {
    var parts = cidr.split('/');
    var ip = parts[0];
    var mask = (0xffffffff << (32 - parseInt(parts[1]))) >>> 0;
    var ipValue = ip2long(ip) >>> 0;
    return !ipRangeList.some(function(range) {
      return (ipValue >= range[0] && ipValue < range[1]);
    });
  });

  return [invalidCIDRs.length === 0, invalidCIDRs];

  // Helper function to convert an IP address to a long value
  function ip2long(ip) {
    return ip.split('.').reduce(function(ipInt, octet) {
      return (ipInt << 8) + parseInt(octet, 10);
    }, 0) >>> 0;
  }
}
