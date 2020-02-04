const bcrypt = require('bcrypt');

const password = '1234Segura!';

// bcrypt.hash(clave, numero_veces_algoritmo, callback)
bcrypt.hash(password, 5, function(err, hash) {
  console.log(hash);
  bcrypt.compare(password, hash, function(error, result){
    console.log(result);
  })
});