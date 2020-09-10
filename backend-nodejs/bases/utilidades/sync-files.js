const fs = require('fs')

try {
  // Leer lo que le pasamos por el terminal
  const file = process.argv[2];

  const content = fs.readFileSync(file).toString()
  const lines = content.split('\n').length;
  console.log(lines)
} catch (error) {
  console.error(error)
}