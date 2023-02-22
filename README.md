<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">

</head>
<body>
  <cite>Code written with the invaluable assistance of ChatGPT</cite>
  <h1>Summary of IP Range to CIDR Notations Conversion and CIDR Subset Check Project</h1>
  <p>In this project, we worked on converting IP ranges to CIDR notations and checking if one list of CIDR notations is a subset of another list. We started by analyzing the IP range 80.80.80.10 - 80.80.80.40 and arrived at the following CIDR notations:</p>
  <pre>
[
  "80.80.80.10/31",
  "80.80.80.12/30",
  "80.80.80.16/28",
  "80.80.80.32/29",
  "80.80.80.40/32"
]
  </pre>
  <p>We then expanded our analysis to include the IP range 80.80.80.60 - 80.80.80.90 and arrived at the following additional CIDR notations:</p>
  <pre>
[
  "80.80.80.60/30",
  "80.80.80.64/28",
  "80.80.80.80/29",
  "80.80.80.88/31",
  "80.80.80.90/32"
]
  </pre>
  <p>We combined all the CIDR notations into a single array for easy reference:</p>
  <pre>
[
  "80.80.80.10/31",
  "80.80.80.12/30",
  "80.80.80.16/28",
  "80.80.80.32/29",
  "80.80.80.40/32",
  "80.80.80.60/30",
  "80.80.80.64/28",
  "80.80.80.80/29",
  "80.80.80.88/31",
  "80.80.80.90/32"
]
  </pre>
  <p>We also wrote a JavaScript function to check if one list of CIDR notations is a subset of another list:</p>
  <pre>
function isSubsetOfCIDRs(cidrList, subsetList) {
  // Function code goes here
}
  </pre>
  <p>We made sure the function was compatible with the ServiceNow San Diego version and provided an example of how to use it in ServiceNow.</p>
</body>
</html>
