/* Agregando el usuario */
CREATE ROLE desarrollo WITH LOGIN PASSWORD 'desarrollo';

/* Creando la base de datos*/
CREATE DATABASE platziverse;

/* Asignando todos los privilegios de la base de datos de platziverse al usuario desarrollo */
GRANT ALL PRIVILEGES ON DATABASE platziverse TO desarrollo;
