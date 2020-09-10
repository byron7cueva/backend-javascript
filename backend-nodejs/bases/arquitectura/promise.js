const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    if (Math.random() < 0.5) {
      resolve('hello word')
    } else {
      reject(new Error('Hello error'))
    }
  }, 2000)
})

promise
  .then(msg => msg.toUpperCase())
  .then(msg => console.log(msg))
  .catch(error => console.error(error.message))