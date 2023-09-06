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
            let ageData = data.age;
            let emailData = data.email;
            let cellphoneData = data.cellphone;
            let genderData = data.gender;
            let dniData = data.dni;
            addToTable(ID_DATA, nameData, lastNameData, emailData, genderData, dniData, ageData, cellphoneData);
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

/* Funciones que validan campos ingresados */
function isValidData(name, lastName, email, dni, age, cellphone) {
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
        errors.push("El DNI solo debe contener números y deben ser 8 dígitos.");
    }

    if (age.trim() === "") {
        errors.push("La edad no puede estar en blanco.");
    } else if (!isValidAge(age)) {
        errors.push("La edad debe ser un número entero positivo de hasta 3 dígitos.");
    }

    if (cellphone.trim() === "") {
        errors.push("El número de celular no puede estar en blanco.");
    } else if (!isValidCellphone(cellphone)) {
        errors.push("El número de celular debe ser un número entero.");
    }

    return errors;
}
function isValidAge(age) {
    const agePattern = /^\d{1,3}$/;
    return agePattern.test(age);
}
function isValidCellphone(cellphone) {
    const cellphonePattern = /^\d+$/;
    return cellphonePattern.test(cellphone);
}
function isValidEmail(email) {
    const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
    return emailRegex.test(email);
}
function isValidName(name) {
    const nameRegex = /^[a-zA-Z\s]+$/;
    return nameRegex.test(name);
}
function isValidDni(dni) {
    const dniRegex = /^[0-9]{8}$/;
    return dniRegex.test(dni);
}

/* Funcion que añade a la tabla los datos de las personas cargadas en la DB */
function addToTable(idData, nameData, lastNameData, emailData, genderData, dniData, ageData, cellphoneData) {
    const table = document.getElementById("table-employees").getElementsByTagName("tbody")[0];
    const newRow = document.createElement("tr");

    const columnNames = {
        "ID": idData,
        "Nombre/s": nameData,
        "Apellido/s": lastNameData,
        "Email": emailData,
        "Género": genderData,
        "DNI": dniData,
        "Edad": ageData,
        "Celular": cellphoneData,
    };

    for (const columnName in columnNames) {
        const cell = document.createElement("td");
        cell.textContent = columnNames[columnName];
        newRow.appendChild(cell);
    }
    table.appendChild(newRow);
}

/* Funcion que actualiza la informacion en pantalla de la tabla con los datos modificados */
function updateInTable(id, name, lastName, email, gender, dni, age, cellphone){

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
            cells[6].textContent = age;
            cells[7].textContent = cellphone;
            break;
        }
    }
}

/* Funciones que muestran en pantalla los datos solicitados */
function printById (id, name, lastName, email, gender, dni, age, cellphone) {
    const div = document.getElementById("get-by-id-div");
    div.innerHTML = `ID: ${id} NOMBRE: ${name} APELLIDO: ${lastName} EMAIL: ${email} GÉNERO: ${gender} DNI: ${dni} EDAD: ${age} TELEFONO: ${cellphone}`;
}
function printByGender(id, name, lastName, email, gender, dni, age, cellphone) {
    const div = document.getElementById("get-by-gender-div");
    const employeeDiv = document.createElement("div");
    employeeDiv.innerHTML = `ID: ${id} NOMBRE: ${name} APELLIDO: ${lastName} EMAIL: ${email} GÉNERO: ${gender} DNI: ${dni} EDAD: ${age} TELEFONO: ${cellphone}`;
    div.appendChild(employeeDiv);
}
function printAll(id, name, lastName, email, gender, dni, age, cellphone){
    const div = document.getElementById("get-all-div");
    const employeeDiv = document.createElement("div");
    employeeDiv.innerHTML = `ID: ${id} NOMBRE: ${name} APELLIDO: ${lastName} EMAIL: ${email} GÉNERO: ${gender} DNI: ${dni} EDAD: ${age} TELEFONO: ${cellphone}`;
    div.appendChild(employeeDiv);
}

/* Funciones que eliminan datos de la tabla*/
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