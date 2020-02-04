const http = require('http');

http.createServer(router).listen(3000);

/*function router(req, resp){
  console.log('Nueva peticion');
  console.log(req.url);
  // Escribiendo la respuesta al usuario
  resp.write('Hola, ya se usar HTTP de node.js');
  // Cambiando el codigo de respuesta y el tipo de contenido
  resp.writeHead(201, {'Content-Type': 'text/plain'});
  // Para que envie la peticion
  resp.end();
}*/

function router(req, resp){
  console.log('Nueva peticion');
  console.log(req.url);
  switch(req.url) {
    case '/hola':
      resp.write('Hola que tal');
    break;
    default:
      resp.write('Error 404: No se lo que quieres');
    break;
  }
  resp.end();
}

console.log('Escuchando http en el puerto 3000');