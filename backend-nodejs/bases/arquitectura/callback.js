const asyncCallback = function(cb) {
  setTimeout(() => {
    if (Math.random() < 0.5) {
      // Error first callback
      // Cuando un callback tiene un error lo que se va enviar como primer parametro es el error
      // Si no hay error entonces se envia un null y consecuentemente los parametros que necesita la funcion
      return cb(null, 'hello word')
    } else {
      cb(new Error('Hello error'))
    }
  }, 2000)
}

asyncCallback((error, msg) => {
  if(error) {
    console.error(error.message)
  } else {
    console.log('message', msg)
  }
})