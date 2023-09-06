/* Endpoint usado en post, get all, delete all */

const GENERAL_ENDPOINT = "http://localhost:8080/api/v1/employees/";

/* Funcion que guarda los datos */

function postData(postRequest){
    const postOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(postRequest)
    };

    fetch(GENERAL_ENDPOINT, postOptions)
        .then(response => response.json())
        .then(data => {
            const ID_DATA = data.id;
            let nameData = data.name;
            let lastNameData = data.lastName;
            let emailData = data.email;
            let genderData = data.gender;
            let dniData = data.dni;
            addToTable(ID_DATA, nameData, lastNameData, emailData, genderData, dniData);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

/* Funcion que muestra errores por pantalla */

function displayErrors(errors) {
    const errorContainer = document.getElementById("error-container");
    errorContainer.innerHTML = "<p>Por favor, corrija los siguientes errores:</p><ul>";

    errors.forEach((error) => {
        errorContainer.innerHTML += `<li>${error}</li>`;
    });

    errorContainer.innerHTML += "</ul>";
}

/* Funcion que valida los campos ingresados */

function isValidData(name, lastName, email, dni) {
    const errors = [];

    if (name.trim() === "") {
        errors.push("El nombre no puede estar en blanco.");
    } else if (!isValidName(name)) {
        errors.push("El nombre no puede contener números ni caracteres especiales.");
    }

    if (lastName.trim() === "") {
        errors.push("El apellido no puede estar en blanco.");
    } else if (!isValidName(lastName)) {
        errors.push("El apellido no puede contener números ni caracteres especiales.");
    }

    if (email.trim() === "") {
        errors.push("El correo electrónico no puede estar en blanco.");
    } else if (!isValidEmail(email)) {
        errors.push("Debe ingresar una dirección de correo electrónico válida.");
    }

    if (dni.trim() === "") {
        errors.push("El DNI no puede estar en blanco.");
    } else if (!isValidDni(dni)) {
        errors.push("El DNI solo debe contener números y deben ser 8 digitos.");
    }

    return errors;
}

/* Funcion que verifica que el email sea valido */

function isValidEmail(email) {
    const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
    return emailRegex.test(email);
}

/* Funcion que verifica que el nombre y/o apellido sean validos */

function isValidName(name) {
    const nameRegex = /^[a-zA-Z\s]+$/;
    return nameRegex.test(name);
}

/* Funcion que verifica que el DNI sea valido */

function isValidDni(dni) {
    const dniRegex = /^[0-9]{8}$/;
    return dniRegex.test(dni);
}

/* Funcion que añade a la tabla los datos de las personas cargadas en la DB */

function addToTable(idData, nameData, lastNameData, emailData, genderData, dniData) {
    const table = document.getElementById("table-employees").getElementsByTagName("tbody")[0];
    const newRow = document.createElement("tr");

    const columnNames = {
        ID: idData,
        "Nombre/s": nameData,
        "Apellido/s": lastNameData,
        Email: emailData,
        Genero: genderData,
        DNI: dniData,
    };

    for (const columnName in columnNames) {
        const cell = document.createElement("td");
        cell.textContent = columnNames[columnName];
        newRow.appendChild(cell);
    }

    table.appendChild(newRow);
}

/* Funcion que actualiza la informacion en pantalla de la tabla con los datos modificados */

function updateInTable(id, name, lastName, email, gender, dni){

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

/* Funcion que muestra en la pantalla los datos de la persona con el id especificado */

function printById (id, name, lastName, email, gender, dni) {
    const div = document.getElementById("get-by-id-div");

    div.innerHTML = `ID: ${id} NOMBRE: ${name} APELLIDO: ${lastName} EMAIL: ${email} GÉNERO: ${gender} DNI: ${dni}`;
}

/* Funcion que muestra en pantalla los datos por genero */

function printByGender(id, name, lastName, email, gender, dni) {
    const div = document.getElementById("get-by-gender-div");
    const employeeDiv = document.createElement("div");

    employeeDiv.innerHTML = `ID: ${id} NOMBRE: ${name} APELLIDO: ${lastName} EMAIL: ${email} GÉNERO: ${gender} DNI: ${dni}`;
    div.appendChild(employeeDiv);
}

/* Funcion que muestra los datos de todos*/

function printAll(id, name, lastName, email, gender, dni){
    const div = document.getElementById("get-all-div");
    const employeeDiv = document.createElement("div");

    employeeDiv.innerHTML = `ID: ${id} NOMBRE: ${name} APELLIDO: ${lastName} EMAIL: ${email} GÉNERO: ${gender} DNI: ${dni}`;
    div.appendChild(employeeDiv);
}

/* Funcion que elimina de la tabla por ID */

function deleteByIdTable(DELETE_ID) {
    const TABLE = document.getElementById("table-employees").getElementsByTagName("tbody")[0];
    const ROWS = TABLE.getElementsByTagName("tr");

    for (let i = 0; i < ROWS.length; i++) {
        const TR_ID = ROWS[i].getElementsByTagName("td")[0];
        if (TR_ID.textContent === DELETE_ID) {
            TABLE.removeChild(ROWS[i]); // Elimina la fila correspondiente
            break;
        }
    }
}

/* Funcion que elimina todos los datos en la tabla */

function deleteAllTable(){
    const TABLE = document.getElementById("table-employees").getElementsByTagName("tbody")[0];
    TABLE.innerHTML = "";
}

export default {
    postData,
    displayErrors,
    isValidData,
    isValidEmail,
    isValidName,
    isValidDni,
    addToTable,
    updateInTable,
    printById,
    printByGender,
    printAll,
    deleteByIdTable,
    deleteAllTable
};