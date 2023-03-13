// Array de usuarios
const usuarios = [
  {
    Nombre: "Andres",
    numeroDocumento: "12345678",
    contraseña: "admin123",
    tipo: "administrador"
  },
  {
    Nombre: "Jenny",
    numeroDocumento: "12345",
    contraseña: "cliente123",
    tipo: "cliente"
  }
];

// Estado inicial del cajero
let cajero = {
  billetes5000: 0,
  billetes10000: 0,
  billetes20000: 0,
  billetes50000: 0,
  billetes100000: 0,
  saldo: 0
};
// Funcion para cargar los billetes al cajero
function cargarCajero() {
  let billetes5000 = parseInt(prompt("Ingrese la cantidad de billetes de $5000 a cargar:"));
  let billetes10000 = parseInt(prompt("Ingrese la cantidad de billetes de $10000 a cargar:"));
  let billetes20000 = parseInt(prompt("Ingrese la cantidad de billetes de $20000 a cargar:"));
  let billetes50000 = parseInt(prompt("Ingrese la cantidad de billetes de $50000 a cargar:"));
  let billetes100000 = parseInt(prompt("Ingrese la cantidad de billetes de $100000 a cargar:"));

  cajero.billetes5000 += billetes5000;
  cajero.billetes10000 += billetes10000;
  cajero.billetes20000 += billetes20000;
  cajero.billetes50000 += billetes50000;
  cajero.billetes100000 += billetes100000;

  cajero.saldo += (billetes5000 * 5000) + (billetes10000 * 10000) + (billetes20000 * 20000) + (billetes50000 * 50000) + (billetes100000 * 100000);
  alert("El cajero ha sido cargado exitosamente.");
}
// funcion para realizar retiro del cajero
function retirarDinero() {
  let cantidad = parseInt(prompt("Ingrese la cantidad de dinero que desea retirar:"));

  if (cantidad > cajero.saldo) {
    alert("El cajero no tiene suficiente dinero para realizar el retiro.");
    return;
  }

  let billetes100000 = Math.floor(cantidad / 100000);
  cantidad = cantidad - (billetes100000 * 100000);
  let billetes50000 = Math.floor(cantidad / 50000);
  cantidad = cantidad - (billetes50000 * 50000);
  let billetes20000 = Math.floor(cantidad / 20000);
  cantidad = cantidad - (billetes20000 * 20000);
  let billetes10000 = Math.floor(cantidad / 10000);
  cantidad = cantidad - (billetes10000 * 10000);
  let billetes5000 = Math.floor(cantidad / 5000);

  if (billetes100000 > cajero.billetes100000 || billetes50000 > cajero.billetes50000 || billetes20000 > cajero.billetes20000 || billetes10000 > cajero.billetes10000 || billetes5000 > cajero.billetes5000) {
    alert("El cajero no tiene suficientes billetes para realizar el retiro.");
    return;
  }

  cajero.billetes100000 -= billetes100000;
  cajero.billetes50000 -= billetes50000;
  cajero.billetes20000 -= billetes20000;
  cajero.billetes10000 -= billetes10000;
  cajero.billetes5000 -= billetes5000;
  cajero.saldo -= (billetes100000 * billetes100000)+(billetes50000 * 50000) + (billetes20000 * 20000) + (billetes10000 * 10000) + (billetes5000 * 5000);
  alert(`Ha retirado ${billetes100000}. billetes de $100000, ${billetes50000} billetes de $50000, ${billetes20000} billetes de $20000, ${billetes10000} billetes de $10000 y ${billetes5000} billetes de $5000.\n\nEl cajero tiene un saldo de $${cajero.saldo}.`);
  }
  


// Función para iniciar sesión
function iniciarSesion() {
  let numeroDocumento = prompt("Ingrese su número de documento:");
  let contraseña = prompt("Ingrese su contraseña:");

  let usuario = usuarios.find(u => u.numeroDocumento === numeroDocumento && u.contraseña === contraseña);

  if (!usuario) {
    alert("Las credenciales ingresadas son incorrectas. Intente nuevamente.");
    iniciarSesion();
    return;
  }

  if (usuario.tipo === "administrador") {
    alert("Bienvenido, administrador.");
    cargarCajero();
    iniciarSesion();
    return;
  }

  alert("Bienvenido, cliente.");
  retirarDinero();
  iniciarSesion();
}

// Iniciar el programa
iniciarSesion();

