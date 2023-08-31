/* Constantes de los botones */

const postEmployeeButton = document.getElementById("postEmployeeButton");
const putEmployeeButton = document.getElementById("putEmployeeButtonButton");
const getEmployeeByIdButton = document.getElementById("getEmployeeByIdButtonByIdButton");
const getEmployeeByGenderButton = document.getElementById("getEmployeeByGenderButtonByGenderButton");
const getAllEmployeesButton = document.getElementById("getEmployeeByIdButtonAllButton");
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

    /*Funcion fetch*/

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
        });
}
/* Añado al botón un evento click y mediante una funcion llama a la funcion saveEmployee */

postEmployeeButton.addEventListener("click", function (){
    saveEmployee();
})

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










/*

Endpoints

const employeeByIdEndpoint = `http://localhost:8080/api/v1/employees/${id}`;
const getEmployeeByGenderEndpoint =  `http://localhost:8080/api/v1/employees/gender/${gender}`;
*/


/*

Constantes de los valores de los inputs para modificar

const employeeIdUpdated = document.getElementById("put-id").value;
const employeeNameUpdated = document.getElementById("put-name").value;
const employeeLastNameUpdated = document.getElementById("put-lastName").value;
const employeeEmailUpdated = document.getElementById("put-email").value;
const employeeGenderUpdated = document.getElementById("put-gender").value;
const employeeDniUpdated =document.getElementById("put-dni").value;

*/