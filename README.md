# CRUD API REST 

CRUD hecho con JAVA y Spring boot. Apliqué patrones MVC, DTO, Repository, IoC, Inyeccion de dependencias, además manejo excepciones y validaciones de datos. La base de datos es MySQL y está versionado con Git.  
La interfaz (frontend) fue hecha con HTML, CSS y JavaScript, es responsive para dispositivos moviles.



---
- [Instalacion](#instalación)
- [Documentación Swagger](#documentación-swagger)
- [Endpoints](#endpoints-api)
	- [PUT](#put)
	- [POST](#post)
	- [GET BY ID](#get-by-id)
	- [GET BY GENDER](#get-by-gender)
	- [GET ALL](#get-all)
	- [DELETE BY ID](#delete-by-id)
	- [DELETE ALL](#delete-all)


## Instalación

### Configuración y ejecución de la aplicación
Para configurar, instalar y ejecutar la aplicación siga estos pasos. Asegurate de tener Java 17 y MySQL instalados.

### Cloná el repositorio
Primero, cloná este repositorio en tu máquina local usando el siguiente comando en tu terminal:

git clone https://github.com/Villarruel-Thiago-Bautista/EmployeeCRUD.git

### Abrí el Proyecto en tu Entorno de Desarrollo (IDE)
Abrí tu entorno de desarrollo preferido (puede ser IntelliJ IDEA, NetBeans, Eclipse, Spring Tool Suite, u otro) y seleccioná "Open Project" (Abrir Proyecto) o su equivalente. Navegá hasta la carpeta del proyecto que acabas de clonar y ábrilo.

### Configurá la base de datos
En el archivo application.properties,que se encuentra en la carpeta de recursos del proyecto (src/main/resources/application.properties), tenes que realizar los siguientes ajustes:

spring.datasource.url=jdbc:mysql://localhost:3306/tu_base_de_datos?serverTimezone=UTC  
spring.datasource.username=tu_usuario  
spring.datasource.password=tu_contraseña  

springdoc.api-docs.enabled = true  
springdoc.swagger-ui.enabled = true  
springdoc.swagger-ui.path=/doc/swagger-ui-custom.html  

Reemplazá tu_base_de_datos, tu_usuario y tu_contraseña con la información correspondiente a tu configuración de MySQL.

### Creá la Base de Datos
Abrí tu cliente de MySQL, o utilizá una herramienta como phpMyAdmin para crear la base de datos con el nombre que especificaste en la URL anterior.

### Ejecutá la Aplicación
Una vez que hayas configurado la base de datos y guardado los cambios en application.properties, podes ejecutar la aplicación. Busca la clase principal "EmployeeCrudApplication" (etiquetada como @SpringBootApplication) y ejecutala como una aplicación Java en tu entorno de desarrollo.

### Accede a la Aplicación
Una vez que la aplicación se haya iniciado correctamente, abrí un navegador web y ve a la dirección http://localhost:puerto (el puerto predeterminado suele ser 8080, pero puede variar según tu configuración). Deberías poder ver la interfaz de la aplicación y probarla.

## Endpoints API

### Post

```http
  POST localhost:{su_puerto}/api/v1/employees/
```

| Parametro | Tipo     | Descripción              |
| :-------- | :------- | :------------------------- |
| employee | `Employee` | **Requerido** por body.  |

- URL: http://localhost:8080/api/v1/employees/
- Metodo: POST
- Parametros:
	datos personales en formato json (body)
- Respuesta:  
	200: id, name, lastName, age, email, cellphone, gender, dni (DTO)  
	400 - 500: mensaje de error


Ejemplo por Postman

![github-small](https://images2.imgbox.com/be/d7/ZbCLBdYo_o.png)


### Put

```http
  PUT localhost:{su_puerto}/api/v1/employees/{id}
```
| Parametro | Tipo     | Descripción              |
| :-------- | :------- | :------------------------- |
| `id` | `long` | **Requerido** por url.  |

| Parametro | Tipo     | Descripción              |
| :-------- | :------- | :------------------------- |
| `employee` | `Employee` | **Requerido** por body.  |

- URL: htpp://localhost:8080/api/v1/employees/{id}
- Metodo: PUT
- Parametros:
	id (url), datos personales en formato json (body)
- Respuesta:
	200: id, name, lastName, age, email, cellphone, gender, dni (DTO)  
	400 - 500: mensaje de error

Ejemplo por Postman

![github-small](https://images2.imgbox.com/83/84/knP6E7pI_o.png)

### Get by id

```http
  GET localhost:{su_puerto}/api/v1/employees/{id}
```

| Parametro | Tipo     | Descripción                     |
| :-------- | :------- | :-------------------------------- |
| `id`      | `long` | **Requerido** por url.  |

- URL: htpp://localhost:8080/api/v1/employees/{id}
- Metodo GET
- Parametros:
	id (url)
- Respuesta:  
	200: id, name, lastName, age, email, cellphone, gender, dni (DTO)  
	400 - 500: excepcion personalizada (EmployeeNotFoundException)

Ejemplo por Postman

![github-small](https://images2.imgbox.com/31/4f/pg3bQ0UC_o.png)

### Get by gender

```http
  GET localhost:{su_puerto}/api/v1/employees/gender/{gender}
```

| Parametro | Tipo     | Descripción                     |
| :-------- | :------- | :-------------------------------- |
| `gender`      | `Gender (Enum)` | **Requerido** por url.  |

- URL: htpp://localhost:8080/api/v1/employees/gender/{gender}
- Metodo GET
- Parametros:
	gender (Enum MASCULINO, FEMENINO) (url)
- Respuesta:
	200: Lista de personas por genero (DTO)  
	400 - 500: excepcion personalizada (EmployeeGenderNotFoundException)

Ejemplo por Postman

![github-small](https://images2.imgbox.com/18/44/WfpQTHEp_o.png)

### Get all

```http
  GET htpp://localhost:{su_puerto}/api/v1/employees/
```

| Parametro | Tipo     | Descripción                     |
| :-------- | :------- | :-------------------------------- |
|      |  | **No se requieren parametros**  |

- URL: htpp://localhost:8080/api/v1/employees/
- Metodo GET
- Parametros:
	Ninguno
- Respuesta:
	200: Lista de todas las personas (DTO)  
	400 - 500: excepcion personalizada (EmptyListException)

Ejemplo por Postman

![github-small](https://images2.imgbox.com/a0/ec/wUOCkSFq_o.png)

### Delete by id

```http
  DELETE htpp://localhost:{su_puerto}//api/v1/employees/{id}
```

| Parametro | Tipo     | Descripción                     |
| :-------- | :------- | :-------------------------------- |
| `id`      | `long` | **Requerido** por url  |

- URL: htpp://localhost:8080/api/v1/employees/{id}
- Metodo DELETE
- Parametros:
	id (url)
- Respuesta:
	200: vacio  
	400 - 500: excepcion personalizada (EmployeeNotFoundException)

Ejemplo por Postman

![github-small](https://images2.imgbox.com/be/87/bKbfAW3I_o.png)

### Delete all

```http
  DELETE htpp://localhost:{su_puerto}//api/v1/employees/
```

| Parametro | Tipo     | Descripción                     |
| :-------- | :------- | :-------------------------------- |
|      |  | **No se requieren parametros**  |

- URL: htpp://localhost:8080/api/v1/employees/
- Metodo DELETE
- Parametros:
	Ninguno
- Respuesta:
	200: vacio  
	400 - 500: excepcion personalizada (EmptyListException)

Ejemplo por Postman

![github-small](https://images2.imgbox.com/fe/74/NeHmHfmP_o.png)


---
### Documentación Swagger

Para acceder a la documentación, una vez corrido el programa, ingrese a: http://localhost:{su_puerto}/doc/swagger-ui/index.html
