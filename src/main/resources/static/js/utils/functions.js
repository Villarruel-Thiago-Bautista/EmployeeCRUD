/* Endpoint used in POST, GET ALL, DELETE ALL. */
const GENERAL_ENDPOINT = "http://localhost:8080/api/v1/employees/";

/* Function that saves the data */
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

/* Function that displays errors on the screen */
function displayErrors(errors) {
    const errorContainer = document.getElementById("error-container");
    errorContainer.innerHTML = "<p>Please correct the following errors:</p><ul>";

    errors.forEach((error) => {
        errorContainer.innerHTML += `<li>${error}</li>`;
    });
    errorContainer.innerHTML += "</ul>";
}

/* Functions that validate entered fields */
function isValidData(name, lastName, email, dni, age, cellphone) {
    const errors = [];

    if (name.trim() === "") {
        errors.push("The name cannot be empty.");
    } else if (!isValidName(name)) {
        errors.push("The name cannot contain numbers or special characters.");
    }

    if (lastName.trim() === "") {
        errors.push("The lastname cannot be empty.");
    } else if (!isValidName(lastName)) {
        errors.push("The name cannot contain numbers or special characters.");
    }

    if (email.trim() === "") {
        errors.push("The email address cannot be empty.");
    } else if (!isValidEmail(email)) {
        errors.push("You must enter a valid email address.");
    }

    if (dni.trim() === "") {
        errors.push("The DNI (National Identification Document) cannot be empty.");
    } else if (!isValidDni(dni)) {
        errors.push("The DNI (National Identification Document) must only contain numbers and must be 8 digits.");
    }

    if (age.trim() === "") {
        errors.push("The age cannot be empty.");
    } else if (!isValidAge(age)) {
        errors.push("The age must be a positive integer of up to 3 digits.");
    }

    if (cellphone.trim() === "") {
        errors.push("The phone number cannot be empty.");
    } else if (!isValidCellphone(cellphone)) {
        errors.push("The phone number must be a positive integer.");
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

/* Function that adds data of persons loaded in the DB to the table */
function addToTable(idData, nameData, lastNameData, emailData, genderData, dniData, ageData, cellphoneData) {
    const table = document.getElementById("table-employees").getElementsByTagName("tbody")[0];
    const newRow = document.createElement("tr");

    const columnNames = {
        "ID": idData,
        "Name": nameData,
        "Lastname": lastNameData,
        "Email": emailData,
        "Gender": genderData,
        "DNI": dniData,
        "Age": ageData,
        "Cellphone": cellphoneData,
    };

    for (const columnName in columnNames) {
        const cell = document.createElement("td");
        cell.textContent = columnNames[columnName];
        newRow.appendChild(cell);
    }
    table.appendChild(newRow);
}

/* Function that updates data of persons loaded in the DB in the table */
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

/* Functions that display requested data on the screen */
function printById (id, name, lastName, email, gender, dni, age, cellphone) {
    const div = document.getElementById("get-by-id-div");
    div.innerHTML = `ID: ${id} NAME: ${name} LASTNAME: ${lastName} EMAIL: ${email} GENDER: ${gender} DNI: ${dni} AGE: ${age} CELLPHONE: ${cellphone}`;
}
function printByGender(id, name, lastName, email, gender, dni, age, cellphone) {
    const div = document.getElementById("get-by-gender-div");
    const employeeDiv = document.createElement("div");
    employeeDiv.innerHTML = `ID: ${id} NAME: ${name} LASTNAME: ${lastName} EMAIL: ${email} GENDER: ${gender} DNI: ${dni} AGE: ${age} CELLPHONE: ${cellphone}`;
    div.appendChild(employeeDiv);
}
function printAll(id, name, lastName, email, gender, dni, age, cellphone){
    const div = document.getElementById("get-all-div");
    const employeeDiv = document.createElement("div");
    employeeDiv.innerHTML = `ID: ${id} NAME: ${name} LASTNAME: ${lastName} EMAIL: ${email} GENDER: ${gender} DNI: ${dni} AGE: ${age} CELLPHONE: ${cellphone}`;
    div.appendChild(employeeDiv);
}

/* Functions that delete data from the table */
function deleteByIdTable(DELETE_ID) {
    const TABLE = document.getElementById("table-employees").getElementsByTagName("tbody")[0];
    const ROWS = TABLE.getElementsByTagName("tr");
    for (let i = 0; i < ROWS.length; i++) {
        const TR_ID = ROWS[i].getElementsByTagName("td")[0];
        if (TR_ID.textContent === DELETE_ID) {
            TABLE.removeChild(ROWS[i]);
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