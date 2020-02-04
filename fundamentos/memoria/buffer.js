// Creando un bufer indicando cuantos espacios de memoria quiero
// let buffer = Buffer.alloc(1);

// Guardando informacion en cada espacio del buffer
// let buffer = Buffer.from([1,2,5]);

let buffer = Buffer.from('Hola');

console.log(buffer);
console.log(buffer.toString());

let abc = Buffer.alloc(26);
console.log(abc);

for(let i = 0; i < 26; i++) {
  abc[i] = i + 97;
}

console.log(abc.toString());