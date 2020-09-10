const fs = require('fs')
const file = fs.createWriteStream('./big');

for(let i = 0; i <= 1e6; i++) {
  file.write(
    "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable"
  )
}

file.end()
