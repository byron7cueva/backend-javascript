require('longjohn')

setTimeout(() => {
  throw new Error('boom')
}, 2000)