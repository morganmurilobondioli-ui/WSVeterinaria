# API REST - Android + Node.js + SQL

Este proyecto es una **API REST** desarrollada en **Node.js** con **Express**, que funciona como backend para una aplicación Android.  
Su principal función es conectarse a una **base de datos SQL** para **listar** y **registrar** información.


## Funciones:
- Listar registros desde la base de datos.  
- Registrar nuevos datos en la base de datos.  
- Conexión con aplicación móvil Android.

1. Instalar dependencias:
  ```
npm install
  ```

2. Configurar la conexión a la base de datos

3. Iniciar el servidor:

  ```
node app.js
  ```
La API estará disponible en:
  ```
http://localhost:3000
  ```

Base de datos usada:
 ```
  CREATE DATABASE veterinaria_Luchito;
USE veterinaria_Luchito;

CREATE TABLE mascotas
(
	id 			INT AUTO_INCREMENT PRIMARY KEY,
    nombre 		VARCHAR(40) 	NOT NULL,
    tipo		enum('Perro','Gato')		NOT NULL,
    raza 		VARCHAR(40) 	NOT NULL,
    color 		VARCHAR(40) 	NOT NULL,
    peso		double(5,2)		NOT NULL,
    genero		enum('Macho','Hembra') NOT NULL
)ENGINE = INNODB;

INSERT INTO mascotas (nombre, tipo, raza, color, peso, genero) VALUES
	('Firulais', 'Perro', 'Labrador', 'Marrón', 25.50, 'Macho'),
	('Michi', 'Gato', 'Siames', 'Gris', 4.20, 'Hembra'),
	('Rocky', 'Perro', 'Bulldog', 'Blanco', 18.70, 'Macho'),
	('Luna', 'Gato', 'Persa', 'Blanco', 3.90, 'Hembra');

SELECT * FROM mascotas;
 ```
