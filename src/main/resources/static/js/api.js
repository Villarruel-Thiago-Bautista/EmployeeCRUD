import functions from './utils/functions.js';

/* Endpoint usado en post, get all, delete all */

const GENERAL_ENDPOINT = "http://localhost:8080/api/v1/employees/";

/* Constantes de los botones */

const POST_BUTTON = document.getElementById("post-button");
const PUT_BUTTON = document.getElementById("put-button");
const GET_BY_ID_BUTTON = document.getElementById("get-by-id-button");
const GET_BY_GENDER_BUTTON = document.getElementById("get-by-gender-button");
const GET_ALL_BUTTON = document.getElementById("get-all-button");
const DELETE_BY_ID_BUTTON = document.getElementById("delete-by-id-button");
const DELETE_ALL_BUTTON = document.getElementById("delete-all-button");

/* Metodo post */

function saveEmployee() {
    let name = document.getElementById("post-name").value;
    let lastName = document.getElementById("post-lastName").value;
    let age = document.getElementById("post-age").value;
    let email = document.getElementById("post-email").value;
    let cellphone = document.getElementById("post-cellphone").value;
    let gender = document.getElementById("post-gender").value;
    let dni = document.getElementById("post-dni").value;

    const validationErrors = functions.isValidData(name, lastName, email, dni, age, cellphone);

    if (validationErrors.length > 0) {
        functions.displayErrors(validationErrors);
        return;
    } else {
        const errorContainer = document.getElementById("error-container");
        errorContainer.innerHTML = "Datos cargados de manera correcta.";
    }

    const postRequest = {
        name: name,
        lastName: lastName,
        email: email,
        gender: gender,
        dni: dni,
        age: age,
        cellphone: cellphone
    };

    functions.postData(postRequest);
}

/* Metodo put */

function updateEmployeeById() {
    const ID_UPDATED = document.getElementById("put-id").value;
    const nameUpdated = document.getElementById("put-name").value;
    const lastNameUpdated = document.getElementById("put-lastName").value;
    const ageUpdated = document.getElementById("put-age").value;
    const emailUpdated = document.getElementById("put-email").value;
    const cellphoneUpdated = document.getElementById("put-cellphone").value;
    const genderUpdated = document.getElementById("put-gender").value;
    const dniUpdated = document.getElementById("put-dni").value;

    const BY_ID_ENDPOINT = `http://localhost:8080/api/v1/employees/${ID_UPDATED}`;

    const errors = functions.isValidData(nameUpdated, lastNameUpdated, emailUpdated, dniUpdated, ageUpdated, cellphoneUpdated);

    if (errors.length > 0) {
        // Mostrar mensajes de error al usuario
        const errorContainer = document.getElementById("error-put-container");
        errorContainer.innerHTML = "<p>Por favor, corrija los siguientes errores:</p><ul>";

        errors.forEach((error) => {
            errorContainer.innerHTML += `<li>${error}</li>`;
        });

        errorContainer.innerHTML += "</ul>";
        return;
    } else {
        const errorContainer = document.getElementById("error-put-container");
        errorContainer.innerHTML = "Datos actualizados de manera correcta."
    }

    const putRequest = {
        name: nameUpdated,
        lastName: lastNameUpdated,
        age: ageUpdated,
        email: emailUpdated,
        cellphone: cellphoneUpdated,
        gender: genderUpdated,
        dni: dniUpdated
    };

    const putOptions = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(putRequest)
    };

    fetch(BY_ID_ENDPOINT, putOptions)
        .then(response => response.json())
        .then(data => {
            functions.updateInTable(ID_UPDATED, nameUpdated, lastNameUpdated, emailUpdated, genderUpdated, dniUpdated, ageUpdated, cellphoneUpdated);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

/* Metodos DELETE */

function deleteEmployeById() {
    const div = document.getElementById("delete-by-id-div");

    /* Constante del valor del id ingresado */

    const DELETE_ID = document.getElementById("delete-id").value;

    /* Endpoint */

    const BY_ID_ENDPOINT = `http://localhost:8080/api/v1/employees/${DELETE_ID}`;

    /* Opciones del metodo DELETE */

    const deleteOptions = {
        method: "DELETE"
    };

    /* Funcion fetch */
    fetch(BY_ID_ENDPOINT, deleteOptions)
        .then(response => {
            if(!response.ok) {
                div.innerHTML = "No se encontró una persona con el ID especificado.";
            } else if (response.ok) {
                functions.deleteByIdTable(DELETE_ID);
                div.innerHTML = `Se eliminó la persona con el id: ${DELETE_ID}`;
            } else {
                console.error('Error: no existe una persona con el id especificado', response.statusText);
            }
        })
        .catch(error => {
            console.error('Error: no existe una persona con el id especificado', error);
        });
}

function deleteAllEmployees() {
    const div = document.getElementById("delete-all-div");


    /* Opciones del metodo DELETE */

    const deleteOptions = {
        method: "DELETE"
    };

    /* Funcion fetch */

    fetch(GENERAL_ENDPOINT, deleteOptions)
        .then(response => {
            if (!response.ok){
                div.innerHTML = "No se encontraron datos de personas cargadas.";
            } else if (response.ok) {
                functions.deleteAllTable();
                div.innerHTML = "Se eliminaron todos los datos de las personas";

            } else {
                console.error('Error: no existe una persona con el id especificado', response.statusText);
            }
        })
        .catch(error => {
            console.error('Error: no existe una persona con el id especificado', error);
        });
}

/* Metodos get */

function getEmployeeById() {
    /* Constante del valor del id ingresado */
    const GET_ID = document.getElementById("get-id").value;

    /* Endpoint */
    const BY_ID_ENDPOINT = `http://localhost:8080/api/v1/employees/${GET_ID}`;

    fetch(BY_ID_ENDPOINT)
        .then(response => {
            if (!response.ok) {
                const div = document.getElementById("get-by-id-div");
                div.innerHTML = "No se encontró una persona con el ID especificado.";
            }
            return response.json();
        })
        .then(data => {
            const ID = data.id;
            const NAME = data.name;
            const LAST_NAME = data.lastName;
            const AGE = data.age;
            const EMAIL = data.email;
            const CELLPHONE = data.cellphone;
            const GENDER = data.gender;
            const DNI = data.dni;
            functions.printById(ID, NAME, LAST_NAME, EMAIL, GENDER, DNI, AGE, CELLPHONE);
        })
        .catch(error => {
            console.error(error);
        });
}

function getEmployeesByGender() {
    const GET_GENDER = document.getElementById("get-gender").value;
    const BY_GENDER_ENDPOINT = `http://localhost:8080/api/v1/employees/gender/${GET_GENDER}`;
    const div = document.getElementById("get-by-gender-div");

    // Limpiar contenido anterior
    div.innerHTML = '';

    fetch(BY_GENDER_ENDPOINT)
        .then(response => {
            if(!response.ok){
                div.innerHTML = "No se encontraron personas con el género especificado";
            }else {
                return response.json()
            }
        })
        .then(data => {
            for (let i = 0; i < data.length; i++) {
                const ID = data[i].id;
                const NAME = data[i].name;
                const LAST_NAME = data[i].lastName;
                const AGE = data.age;
                const EMAIL = data[i].email;
                const CELLPHONE = data.cellphone;
                const GENDER = data[i].gender;
                const DNI = data[i].dni;
                functions.printByGender(ID, NAME, LAST_NAME, EMAIL, GENDER, DNI, AGE, CELLPHONE);
            }
        })
}

function getAllEmployees() {

    const div = document.getElementById("get-all-div");

    // Limpiar contenido anterior
    div.innerHTML = '';

    fetch(GENERAL_ENDPOINT)
        .then(response => {
            if(!response.ok){
                div.innerHTML = "No se encontraron personas";
            }else {
                return response.json()
            }
        })
        .then(data => {
            for (let i=0; i<data.length; i++) {
                const ID = data[i].id;
                const NAME = data[i].name;
                const LAST_NAME = data[i].lastName;
                const AGE = data.age;
                const EMAIL = data[i].email;
                const CELLPHONE = data.cellphone;
                const GENDER = data[i].gender;
                const DNI = data[i].dni;
                functions.printAll(ID, NAME, LAST_NAME, EMAIL, GENDER, DNI, AGE, CELLPHONE);
            }
        })
}

    /* Botones que llaman a los metodos */

    POST_BUTTON.addEventListener("click", function () {
        saveEmployee();
    });

    PUT_BUTTON.addEventListener("click", function () {
        updateEmployeeById();
    });

    DELETE_BY_ID_BUTTON.addEventListener("click", function () {
        deleteEmployeById();
    });

    DELETE_ALL_BUTTON.addEventListener("click", function () {
        deleteAllEmployees();
    });

    GET_BY_ID_BUTTON.addEventListener("click", function () {
        getEmployeeById();
    });

    GET_BY_GENDER_BUTTON.addEventListener("click", function () {
        getEmployeesByGender();
    });

    GET_ALL_BUTTON.addEventListener("click", function () {
        getAllEmployees();
    });