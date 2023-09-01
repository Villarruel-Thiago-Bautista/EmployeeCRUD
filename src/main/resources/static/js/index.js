/* Endpoint general */

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

    /* Variables de los valores de los inputs de entrada*/

    let name = document.getElementById("post-name").value;
    let lastName = document.getElementById("post-lastName").value;
    let email = document.getElementById("post-email").value;
    let gender = document.getElementById("post-gender").value;
    let dni =document.getElementById("post-dni").value;

    /* Json donde voy a guardar los datos ingresados */

    const postRequest = {
        name: name,
        lastName: lastName,
        email: email,
        gender: gender,
        dni: dni
    };

    /* Opciones del metodo POST */

    const postOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(postRequest)
    };

    /* Funcion fetch */

    fetch(GENERAL_ENDPOINT, postOptions)
        .then(response => response.json())
        .then (data => {
            const ID_DATA = data.id;
            let nameData = data.name;
            let lastNameData = data.lastName;
            let emailData = data.email;
            let genderData = data.gender;
            let dniData = data.dni;
            printOnTheScreen(ID_DATA, nameData, lastNameData, emailData, genderData, dniData);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

/* Metodo put */

function updateEmployeeById(){

    /* Constantes de los valores de los inputs para modificar */

    const ID_UPDATED = document.getElementById("put-id").value;
    let nameUpdated = document.getElementById("put-name").value;
    let lastNameUpdated = document.getElementById("put-lastName").value;
    let emailUpdated = document.getElementById("put-email").value;
    let genderUpdated = document.getElementById("put-gender").value;
    let dniUpdated = document.getElementById("put-dni").value;

    /* Endpoint */

    const BY_ID_ENDPOINT = `http://localhost:8080/api/v1/employees/${ID_UPDATED}`;

    /* Json donde voy a guardar los datos modificados */

    const putRequest = {
        name: nameUpdated,
        lastName: lastNameUpdated,
        email: emailUpdated,
        gender: genderUpdated,
        dni: dniUpdated
    };

    /* Opciones del metodo Put */

    const putOptions = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(putRequest)
    };

    /* Funcion fetch */

    fetch(BY_ID_ENDPOINT, putOptions)
        .then(response => response.json())
        .then(data => {
            updateOnTheScreen(ID_UPDATED, nameUpdated, lastNameUpdated, emailUpdated, genderUpdated, dniUpdated);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

/* Metodos DELETE */

function deleteEmployeById() {

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
            if (response.ok) {
                const TABLE = document.getElementById("table-employees").getElementsByTagName("tbody")[0];
                const ROWS = TABLE.getElementsByTagName("tr");

                for (let i = 0; i < ROWS.length; i++) {
                    const TR_ID = ROWS[i].getElementsByTagName("td")[0];
                    if (TR_ID.textContent === DELETE_ID) {
                        TABLE.removeChild(ROWS[i]); // Elimina la fila correspondiente
                        break;
                    }
                }
            } else {
                console.error('Error: no existe un empleado con el id especificado', response.statusText);
            }
        })
        .catch(error => {
            console.error('Error: no existe un empleado con el id especificado', error);
        });
}

function deleteAllEmployees() {

    /* Opciones del metodo DELETE */

    const deleteOptions = {
        method: "DELETE"
    };

    /* Funcion fetch */

    fetch(GENERAL_ENDPOINT, deleteOptions)
        .then(response => {
            if (response.ok) {
                const TABLE = document.getElementById("table-employees").getElementsByTagName("tbody")[0];
                TABLE.innerHTML = "";

            } else {
                console.error('Error: no existe un empleado con el id especificado', response.statusText);
            }
        })
        .catch(error => {
            console.error('Error: no existe un empleado con el id especificado', error);
        });
}





















/* Botones que llaman a los metodos */

POST_BUTTON.addEventListener("click", function (){
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

/* Funciones que trabajan los datos mostrados en pantalla */

/* Funcion que añade a la tabla los datos de los empleados cargados en la DB */

function printOnTheScreen(idData, nameData, lastNameData, emailData, genderData, dniData) {

    const table = document.getElementById("table-employees").getElementsByTagName("tbody")[0];
    const newRow = document.createElement("tr");

    const trId = document.createElement("td");
    trId.textContent = idData;
    const trName = document.createElement("td");
    trName.textContent = nameData;
    const trLastName = document.createElement("td");
    trLastName.textContent = lastNameData;
    const trEmail = document.createElement("td");
    trEmail.textContent = emailData;
    const trGender = document.createElement("td");
    trGender.textContent = genderData;
    const trDni = document.createElement("td");
    trDni.textContent = dniData;

    newRow.appendChild(trId);
    newRow.appendChild(trName);
    newRow.appendChild(trLastName);
    newRow.appendChild(trEmail);
    newRow.appendChild(trGender);
    newRow.appendChild(trDni);

    table.appendChild(newRow);
}

/* Funcion que actualiza la informacion en pantalla de la tabla con los datos modificados */

function updateOnTheScreen(id, name, lastName, email, gender, dni){

    const table = document.getElementById("table-employees").getElementsByTagName("tbody")[0];
    const rows = table.getElementsByTagName("tr");

    for (let i = 0; i< rows.length; i++) {
        const trId = rows[i].getElementsByTagName("td")[0];
        if(trId.textContent === id) {
            const cells = rows[i].getElementsByTagName("td");
            cells[1].textContent = name;
            cells[2].textContent = lastName;
            cells[3].textContent = email;
            cells[4].textContent = gender;
            cells[5].textContent = dni;
            break;
        }
    }
}





/*

Endpoints

const generalEmployeeEndpoint = "http://localhost:8080/api/v1/employees/";
const employeeByIdEndpoint = `http://localhost:8080/api/v1/employees/${id}`;
const getEmployeeByGenderEndpoint =  `http://localhost:8080/api/v1/employees/gender/${gender}`;
*/

