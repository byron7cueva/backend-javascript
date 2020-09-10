const promiseFunction = () => new Promise((resolve, reject) => {
  setTimeout(() => {
    if (Math.random() < 0.5) {
      resolve('hello word')
    } else {
      reject(new Error('Hello error'))
    }
  }, 2000)
})

async function asyncAwait() {
  try {
    const msg = await promiseFunction()
    console.log(msg)
  } catch (err) {
    console.error(err.message)
  }
}

asyncAwait()