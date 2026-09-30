//VALIDACIONES DE LOS FORMULARIOS
const validateName = (name) => {
    if(!name) return false; //si no hay nombre falla
    let lengthValid = name.trim().length >= 4;
    return lengthValid
};

const validateEmail = (email) =>{
    if (!email) return false;
    let lengthValid = email.length >15;

    //validamos el formato
    let re = /^[\w.]+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    let formatValid = re.test(email);

    //devolvemos la logica de las validaciones
    return lengthValid && formatValid;

};

const validatePhoneNumber = (phoneNumber) => {
    if (!phoneNumber) return false; //validacion de existencia
    let lengthValid = phoneNumber.length >=8; //validacion de longitud
    let re = /^\+569[0-9]{8}$/; // expresion regular para validar formato chileno
    let formatValid = re.test(phoneNumber);

    //devolver lógica
    return lengthValid && formatValid;
};

//cree un valor auxiliar para validar rut o pasaporte
const validateRut = (valor) => {
    let re = /^[0-9]{7,8}-[0-9kK]{1}$/;
    return re.test(valor);
};

const validatePasaporte= (valor) => {
    let re = /^[a-zA-Z0-9]{6,9}$/; //asumi numeros para pasaporte entre 6 y 9 caracteres
    return re.test(valor);
};

const validateRutPasaporte = (valor) => {
    if (!valor) return false;
    return validateRut(valor) || validatePasaporte(valor);
};

const validateSelect = (select) => {
    if(!select) return false;
    return true;
};

const validateDate = (dateStr) =>{
    if(!dateStr) return false;
    let date = new Date(dateStr);
    let today = new Date();
    today.setHours(23, 59, 59, 999);

    let limit = new Date();
    limit.setFullYear(limit.getFullYear()-10); //no mas de 10 años atras

    let isNotFuture = date <= today;
    let isNotOld = date >= limit;
    return isNotFuture && isNotOld;
};

const validateFiles = (files) => {
    if (!files) return false;
    //validacion numero de archivos
    let lengthValid = 1 <= files.length &&files.length <=3;

    //validacion del tipo de archivos
    let typeValid = true;
    for (const file of files){
        let fileFamily = file.type.split("/")[0];
        typeValid &&= fileFamily == "image" || file.type == "video"
    }
    return lengthValid && typeValid;
}

//VALIDAR EL FORMULARIO DE REGISTRO
const validateFormRegistro = () => {
    //obtener elementos del DOM usando el nombre del formulario
    let myForm = document.forms["myForm"]
    let email = myForm["email"].value;
    let phoneNumber = myForm["phone"].value;
    let nombre = myForm["nombre"].value;
    let rutPasaporte = myForm["rut"].value;
    //let files = myForm["files"].value;
    let region = myForm["select-region"].value;
    let comuna = myForm["select-comuna"].value;


    //variables auxiliares de validacion
    let invalidInputs = [];
    let isValid = true;
    const setInvalidInput = (inputName) =>{
        invalidInputs.push(inputName);
        isValid &&= false;
    };

    //logica de validacion
    if (!validateName(nombre)){
        setInvalidInput("Nombre")
    }
    if(!validateEmail(email)){
        setInvalidInput("Email");
    }
    if(!validatePhoneNumber(phoneNumber)){
        setInvalidInput("Número Telefónico");
    }
    if(!validateRutPasaporte(rutPasaporte)){
        setInvalidInput("Rut o Pasaporte")
    }
    if(!validateSelect(region)){
        setInvalidInput("Región");
    }
    if(!validateSelect(comuna)){
        setInvalidInput("Comuna");
    }

    let validationBox = document.getElementById("val-box");
    let validationMessageElem = document.getElementById("val-msg");
    let validationListElem = document.getElementById("val-list");

    if(!isValid){
        validationListElem.textContent = "";
        //agregamos los elementos invalidos a la lista
        //ver si poner const
        for (const input of invalidInputs){
            let listElement = document.createElement("li");
            listElement.innerText = input;
            validationListElem.append(listElement);
        }
        //establecer el mensaje
        validationMessageElem.innerText = "Los siguientes campos son invalidos"
        // aplicar estilos de error
        validationBox.style.backgroundColor = "#ffdddd";
        validationBox.style.borderLeftColor = "#f44336";
        // hacer visible el mensaje de validación
        validationBox.hidden = false;
        document.getElementById("validation-box").classList.add("hidden");
        myForm.style.display = "flex";

    } else {

        // Ocultar el formulario
        myForm.style.display = "none";
        // establecer mensaje de éxito
        validationBox.hidden = true;
        let validationBox2 = document.getElementById("validation-box");
        validationBox2.classList.remove("hidden");

        document.getElementById("input2-bttn").addEventListener("click", () =>{
            validationBox2.classList.add("hidden");
            document.getElementById("sighting-form").classList.remove("hidden");
        });

        document.getElementById("start-bttn").addEventListener("click", () =>{
            location.reload(); //volver al inicio
        });

    }
};
document.getElementById("registration-form").addEventListener("submit", (e)=>{
    e.preventDefault();
    validateFormRegistro();
});

const validateFormAvistamiento = () => {
    let myForm = document.forms["myform2"];
    let nombreAve = myForm["nombre-ave"].value; // OJO: ver nota sobre "name" duplicado abajo
    let tipoAve = myForm["tipo"].value;
    let region = document.getElementById("select-region-avistamiento").value;
    let comuna = document.getElementById("select-comuna-avistamiento").value;
    let fecha = myForm["fecha"].value;
    let files = myForm["files"].files;

    let invalidInputs = [];
    let isValid = true;
    const setInvalidInput = (inputName) =>{
        invalidInputs.push(inputName);
        isValid &&=false;
    };

    //logica de validacion
    if (!validateName(nombreAve)){
        setInvalidInput("Nombre del ave")
    }
    if(!validateName(tipoAve)){
        setInvalidInput("Tipo del ave");
    }
    if(!validateSelect(region)){
        setInvalidInput("Región del avistamiento");
    }
    if(!validateSelect(comuna)){
        setInvalidInput("Comuna del avistamiento");
    }
    if(!validateDate(fecha)){
        setInvalidInput("Fecha del avistamiento");
    }
    if(!validateFiles(files)){
        setInvalidInput("Registro fotográfico/video")
    }

    let validationBox = document.getElementById("val-box");
    let validationMessageElem = document.getElementById("val-msg");
    let validationListElem = document.getElementById("val-list");

    if(!isValid){
        validationListElem.textContent = "";
        //agregamos los elementos invalidos a la lista
        //ver si poner const
        for (input of invalidInputs){
            let listElement = document.createElement("li");
            listElement.innerText = input;
            validationListElem.append(listElement);
        }
        //establecer el mensaje
        validationMessageElem.innerText = "Los siguientes campos son invalidos"
        // aplicar estilos de error
        validationBox.style.backgroundColor = "#ffdddd";
        validationBox.style.borderLeftColor = "#f44336";

        // hacer visible el mensaje de validación
        validationBox.hidden = false;
    } else {
        myForm.style.display = "none"
        
        let validationBox = document.getElementById("val-box");
        let validationMessageElem = document.getElementById("val-msg");
        let validationListElem = document.getElementById("val-list");
        validationListElem.textContent = "";
        validationMessageElem.innerText = "Avistamiento registrado con exito!";
        //aplicar estilos
        validationBox.style.backgroundColor = "#ddffdd";
        validationBox.style.borderLeftColor = "#4CAF50";

        //crear boton para volver al inicio
        let volverButton = document.createElement("button");
        volverButton.innerText = "Volver al inicio";
        volverButton.addEventListener("click", () => {
            window.location.href = "index.html"; // ajusta al nombre real de tu archivo principal
        });
        validationListElem.appendChild(volverButton);
        //hacer visible el mensaje
        validationBox.hidden = false;

    }
};

document.getElementById("sighting-form").addEventListener("submit", (e)=>{
    e.preventDefault();
    validateFormAvistamiento();
});