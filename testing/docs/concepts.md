# Testing

## Pruebas Unitarias

* Toma bloques de codigo y las divide en pequeñas partes, permitindonos probar.
* Las pruebas unitarias pruebas las cosas que preevemos que van a pasar, no son perfectas prueban suposiciones explicitas.
* Es poner en juego lo que va pasar

### Características

* Automatizables: Deben correr sin ningun proceso manual.
* Total Cobertura: Se debe pasar por cada bloque que estamos escribiendo el testeo para garantizar que esta funcionando correctamente.
* Reutilizables: Usarlas para probar varias cosas sin necesidad de estar haciendo algo muy particular para cada una de ellas.
* Independientes: No depende una prueba de otra, si no que cada una debe de incluir lo que necesita para comprobar lo que esta probando.
* Rápidas de crear: Tienem que ser algo consiso que prueben algo particular.

### Ventajas

* Proporcionan un trabajo ágil.
* Calidad de código.
* Detectar errores más rapido.
* Facilita los cambios y favorece la integración.
* Proporciona información. Ya que son descriptibas.
* Reduce el coste.

### Desventajas

* Es que nosotros mismos probamos.

## Jest

* Es unna compleja herramienta para hacer pruebas unitarias.
* Desarrollada por facebook.
* Nos ofrece una suit.
* Desarrollo rapido.
* Feedback instantaneo.
* Generar snapshot, para comparar elementos.
* No requiere de una configuracion particular.
* Una potente libreria para manejar moking.
* Funciona con TypsScript
* Un Coverage.

### Correr

Correr todas las pruebas

```bash
npx jest
```

```bash
npx jest nombre.test.js
```
