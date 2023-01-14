/* 获取本地局域网 IPv4 / IPv6 
* @params isIpv6  bol,是否为ipv6 
* @return String,IP地址  
* -----------------------------
- todo: ipv6 不准确 
*/

module.exports = (isIpv6=false)=>{
  const interfaces = require('os').networkInterfaces();
  // console.log(  interfaces );
  let list = [];
  Object.keys(interfaces).forEach((key)=>{
    list.push( ...interfaces[key] )
  })
  let flag = 'IPv4';
  let dftIp = '0.0.0.0';
  if (isIpv6) {
    flag = 'IPv6';
    dftIp = '::1';
  }
  let ipItm = list.find((itm)=>{ 
    return itm.family===flag && !itm.internal;   
  }) || {};
  return ipItm.address || dftIp;
}

