const os = require('os')

console.log('CPU info', os.cpus())
console.log('IP address', os.networkInterfaces())
console.log('Free memory', os.freemem())
console.log('OS', os.type())
console.log('SP version', os.release())
console.log('User', os.userInfo())