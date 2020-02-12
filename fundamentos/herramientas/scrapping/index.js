const puppeteer = require('puppeteer');

(async () => {
  console.log('Lanzamos navgador!');
  const browser = await puppeteer.launch();
  // Correr en arch linux
  // const browser = await puppeteer.launch({headless: false, args: ['--disable-gpu']});
  // Se lance pero que se abra
  // const browser = await puppeteer.launch({headless: false});

  // Abrir una pagina
  const page = await browser.newPage();
  await page.goto('https://es.wikipedia.org/wiki/Node.js');

  var titulo1 = await page.evaluate(() => {
    // Lo siguiente se ejecuta en el navegador
    const h1 = document.querySelector('h1');
    console.log(h1.innerHTML);
    console.log('mensaje');
    return h1.innerHTML;
  });

  console.log(titulo1);


  console.log('Cerramos el navegador');
  browser.close();
  console.log('Navegador cerrado');
})();