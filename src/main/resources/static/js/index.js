/* Constantes de los botones */

const postEmployeeButton = document.getElementById("postEmployeeButton");
const putEmployeeButton = document.getElementById("putEmployeeButton");
const getEmployeeByIdButton = document.getElementById("getEmployeeByIdButton");
const getEmployeeByGenderButton = document.getElementById("getEmployeeByGenderButton");
const getAllEmployeesButton = document.getElementById("getEmployeeByIdButton");
const deleteEmployeByIdButton = document.getElementById("deleteEmployeeByIdButton");
const deleteAllEmployeesButton = document.getElementById("deleteAllEmployeesButton");

/* Metodo post */

function saveEmployee() {

    /* Endpoint */

    const generalEmployeeEndpoint = "http://localhost:8080/api/v1/employees/";

    /* Constantes de los valores de los inputs de entrada*/

    const employeeName = document.getElementById("post-name").value;
    const employeeLastName = document.getElementById("post-lastName").value;
    const employeeEmail = document.getElementById("post-email").value;
    const employeeGender = document.getElementById("post-gender").value;
    const employeeDni =document.getElementById("post-dni").value;

    /* Json donde voy a guardar los datos ingresados */

    const postRequest = {
        name: employeeName,
        lastName: employeeLastName,
        email: employeeEmail,
        gender: employeeGender,
        dni: employeeDni
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

    fetch(generalEmployeeEndpoint, postOptions)
        .then(response => response.json())
        .then (data => {
            const idData = data.id;
            const nameData = data.name;
            const lastNameData = data.lastName;
            const emailData = data.email;
            const genderData = data.gender;
            const dniData = data.dni;
            printOnTheScreen(idData, nameData, lastNameData, emailData, genderData, dniData);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

/* Metodo put */

function updateEmployeeById(){

    /* Constantes de los valores de los inputs para modificar */

    const employeeIdUpdated = document.getElementById("put-id").value;
    const employeeNameUpdated = document.getElementById("put-name").value;
    const employeeLastNameUpdated = document.getElementById("put-lastName").value;
    const employeeEmailUpdated = document.getElementById("put-email").value;
    const employeeGenderUpdated = document.getElementById("put-gender").value;
    const employeeDniUpdated = document.getElementById("put-dni").value;

    /* Endpoint */

    const employeeByIdEndpoint = `http://localhost:8080/api/v1/employees/${employeeIdUpdated}`;

    /* Json donde voy a guardar los datos modificados */

    const putRequest = {
        name: employeeNameUpdated,
        lastName: employeeLastNameUpdated,
        email: employeeEmailUpdated,
        gender: employeeGenderUpdated,
        dni: employeeDniUpdated
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

    fetch(employeeByIdEndpoint, putOptions)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            updateOnTheScreen(employeeIdUpdated, employeeNameUpdated, employeeLastNameUpdated, employeeEmailUpdated, employeeGenderUpdated, employeeDniUpdated);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

/* Metodos DELETE */

function deleteEmployeById() {

    /* Constante del valor del id ingresado */

    const deleteId = document.getElementById("delete-id").value;

    /* Endpoint */

    const employeeByIdEndpoint = `http://localhost:8080/api/v1/employees/${deleteId}`;

    /* Opciones del metodo DELETE */

    const deleteOptions = {
        method: "DELETE"
    };

    /* Funcion fetch */
    fetch(employeeByIdEndpoint, deleteOptions)
        .then(response => {
            if (response.ok) {
                const table = document.getElementById("table-employees").getElementsByTagName("tbody")[0];
                const rows = table.getElementsByTagName("tr");

                for (let i = 0; i < rows.length; i++) {
                    const trId = rows[i].getElementsByTagName("td")[0];
                    if (trId.textContent === deleteId) {
                        table.removeChild(rows[i]); // Elimina la fila correspondiente
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

    /* Endpoint */

    const generalEmployeeEndpoint = "http://localhost:8080/api/v1/employees/";

    /* Opciones del metodo DELETE */

    const deleteOptions = {
        method: "DELETE"
    };

    /* Funcion fetch */

    fetch(generalEmployeeEndpoint, deleteOptions)
        .then(response => {
            if (response.ok) {
                const table = document.getElementById("table-employees").getElementsByTagName("tbody")[0];
                table.innerHTML = "";

            } else {
                console.error('Error: no existe un empleado con el id especificado', response.statusText);
            }
        })
        .catch(error => {
            console.error('Error: no existe un empleado con el id especificado', error);
        });
}





















/* Botones que llaman a los metodos */

postEmployeeButton.addEventListener("click", function (){
    saveEmployee();
});

putEmployeeButton.addEventListener("click", function () {
    updateEmployeeById();
});

deleteEmployeByIdButton.addEventListener("click", function () {
    deleteEmployeById();
});

deleteAllEmployeesButton.addEventListener("click", function () {
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

