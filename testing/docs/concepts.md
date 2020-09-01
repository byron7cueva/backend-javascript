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

## Snapshot

* Cuanto queremos probar un api y tenemos un valor que van ha cambiar muy rara vez, para eso se debe crear un snapshot
para comprobar los valores entre los que tenemos y estamos recibiendo.
* La primera vez que se corra la prueba vamos a tener un resultado positivo.
* Y hasta que tengamos una diferencia entre la data y la snapshot es cuando va fallar.
* Se crea una carpeta __snapshot__ donde se crean los snapshot.
* Se los puede crear manualmente pero se debe seguir el formato que nos propone.
* Actualizar el snapshot: ```npx jest -u nombre.test.js```

## 

* Para montar los componentes y hacerle pruebas de una manera mas facil.
* Nos va facilitar poder montar el componente independientemente sin necesidad de que este enbebido dentro en una app
o en el nivel que se encuentre dentro de la aplicación.
