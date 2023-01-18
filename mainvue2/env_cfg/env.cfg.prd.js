

module.exports = {
  env: 'prd',
  // remoteHost: 'https://justfn.github.io',
  mfRemoteMap: {
    remote_libs: {
      protocol: 'https:',
      hostname: `justfn.github.io`,
      port: 443,
      path: '/wbpkotpts',
    },
    remote_vue_applications: {
      protocol: 'https:',
      hostname: `justfn.github.io`,
      port: 443,
      path: '/wbpkotpts',
    },
  },
  
  // 以下为Prd环境独有字段
  xx: 1,
}