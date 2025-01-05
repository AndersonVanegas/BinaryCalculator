//Asignacion de letras a los botones
(
    () => {
        const botones = document.querySelectorAll("button");
        for (let i of botones) {
            i.textContent = i.value;
        }
    }
)();
//Inicializacion de variables
let pantalla = document.getElementById("letras");
let operacion = ["", "", ""];
let resultado = 0;
let binarioMode = false;
let on_count = 0;
let btn_BI = document.getElementById("botonB");
btn_BI.addEventListener("click",()=>{
    on_count++;
    binarioMode = !binarioMode;
    btn_BI.style.textShadow = binarioMode ? "0 0 20px rgb(0, 162, 255)" : "0 0 0 ";
    btn_BI.style.color = binarioMode ? "rgb(2, 9, 95)" : "rgb(255, 217, 0)";
    btn_BI.style.backgroundColor = binarioMode ? "aqua" : "rgb(57, 57, 57)";
    btn_BI.style.boxShadow = binarioMode ? "0 0 20px rgb(0, 162, 255)" : "none";
    Mostrar(1);
})
const numero = (e)=> {
    if(binarioMode) {
        alertar("Desactivar el modo binario");
    }else{
        //Si el signo esta vacio, el numero pulsado sera el numero 1, Si no
    if (operacion[1] == "") {
        operacion[0] += e.value;
    }
    //Si hay un signo 
    else if(operacion [1] != "") {
        operacion[2] += e.value;
    }
    Mostrar()
    }
};
const signo = (e)=> {
        if (operacion[0] == "" && (e.value == "-" || e.value == "+")) {
            operacion[0] += e.value;

        }else if (operacion[0] != "" && operacion[1] == "") {
            operacion[1] = e.value;
        }
        //Si el signo esta vacio
        else if (operacion[2] == "" ) {
            operacion[1] = e.value;
        }
        Mostrar()
    console.log(operacion);
};
const igual = ()=> {
    if(binarioMode) {
        alertar("Desactivar el modo binario");
    }else {
        if (operacion[0] != "" && operacion[1] != "" && operacion[2] != "" && (operacion[0] != "+" && operacion[0] != "-")) {
            operacion = [toNumber(operacion[0]), operacion[1], toNumber(operacion[2])];
            switch (operacion[1]) {
                case "+":
                    resultado = operacion[0] + operacion[2];
                    
                    break;
                case "-":
                    resultado = operacion[0] - operacion[2];
                    break;
                case "x":
                    resultado = operacion[0] * operacion[2];
                    break;
                case "÷":
                    resultado = operacion[2] == 0 ? null : operacion[0] / operacion[2];
                    console.log(operacion);
                    break;
                }
                if (resultado == null) {
                    operacion[0] = operacion[0].toString();
                    operacion[2] = "";
                    alertar("No dividir entre 0");
                }else {
                    resultado = resultado.toString().length > 8 ? resultado.toFixed(12) : resultado;
                    operacion = [resultado.toString(),"",""];
                resultado = operacion[0];
                Mostrar();
            }
        }else {
            alertar("Calcula con dos numeros");
        }
    }
};
const Borrar = ()=> {
    operacion = ["","",""]
    pantalla.textContent = "";
    on_count = 0;
    console.log(operacion);
};
const Mostrar = (option)=> {
    if (option == 1) {
        if(on_count > 0) {
            if (binarioMode) {
                operacion = operacion[2] != "" ? [toBinary(operacion[0]),operacion[1],toBinary(operacion[2])] : [toBinary(operacion[0]),operacion[1],operacion[2]];
            }else {
                operacion = operacion[2] != "" ? [toInteger(operacion[0]),operacion[1],toInteger(operacion[2])] : [toInteger(operacion[0]),operacion[1],operacion[2]];
            }
        }
        pantalla.textContent = `${operacion[0]}${operacion[1]}${operacion[2]}`;
    }else {
        pantalla.textContent = `${operacion[0]}${operacion[1]}${operacion[2]}`;
    }
};
const alertar = (message)=> {
    let sec = 0;
    pantalla.style.color = "red";
    pantalla.style.textShadow = "0 0 10px red"
    pantalla.textContent = message;
    let temporizador = setInterval(()=>{
        sec ++;
        if (sec == 2) {
            Mostrar()
            pantalla.style.color = "aqua";
            pantalla.style.textShadow = "0 0 10px aqua"
            clearInterval(temporizador);
        }
    },500);
};
const toInteger = (binary)=> {
    let acumulador= 0;
    let consecutivo = 0;
    let isNegative = false;
    let cadena = "";
    if (binary[0] == "-") {
        isNegative = true;
        for (let i = 1; i < binary.length; i++) {
            cadena += binary[i];
        }
        binary = cadena;
    }
    for(let i = (binary.length-1);i>-1;i--) {
    acumulador += binary[i] == "0" ? 0 : 2**consecutivo;
    consecutivo++;
    }
    return isNegative ? ("-" + acumulador.toString()): acumulador.toString();  
};
const toBinary = (integer)=> {
    let cadena = "";
    let isNegative = false;
    //Si el numero es negativo, se quitara el signo
    if (integer[0] == "-") {
        isNegative = true;
        for (let i = 1;i < integer.length;i++) {
            cadena += integer[i];
        }
        integer = cadena;
    }
    integer = parseInt(integer);
    let binary = "";
    let resultado = ""; 
    while (integer > 0) {
        binary += (integer % 2).toString();
        integer = parseInt(integer / 2);
      }
    for (let i = (binary.length-1);i>-1;i--) {
        resultado += binary[i];
    }
    return isNegative ? ("-" + resultado) : resultado;
};
const toNumber = (integer)=> {
    let bool;
    //Si la string tiene un . , se le asignara true a la variable bool
    for (let i of integer) {
        if (i == ".") {
            bool = true;
            break;
        }else {
            bool = false;
        }
    }
    //Si bool es true, el numero parasara a flotante, en caso contrario pasa a entero
    let resultado = bool ? parseFloat(integer) : parseInt(integer);
    return resultado;
};