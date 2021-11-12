let nombre = prompt("Cual es tu nombre");
let dispEfectivo = parseInt(prompt("Cual es tu monto disponible en efectivo"));
let dispDebito = parseInt(prompt("Cual es tu monto disponible en Debito"));
let dispTarjeta = parseInt(prompt("Cual es tu monto disponible en Tarjeta"));
let listaGastos = [];

const insertName = document.querySelector("#crearNombre");
const lugarEfe = document.querySelector("#efectivo");
const lugarDeb = document.querySelector("#debito");
const lugarTarj = document.querySelector("#tarjetas");
const olInsert = document.querySelector("#olInsert");
const btnCargar = document.querySelector("#cargar");

const crearNombre = (nombre) => {
  let name = document.createElement("h1");
  name.innerHTML = `Hola ${nombre} Bienvenido!`;

  insertName.append(name);
};
crearNombre(nombre);

const insertEfe = (monto) => {
  lugarEfe.innerHTML = `Disponible en Efectivo $${monto}`;
};
insertEfe(dispEfectivo);

const insertDeb = (monto) => {
  lugarDeb.innerHTML = `Disponible en Debito $${monto}`;
};
insertDeb(dispDebito);

const insertTarj = (monto) => {
  lugarTarj.innerHTML = `Disponible en Tarjeta $${monto}`;
};
insertTarj(dispTarjeta);

class Gasto {
  constructor(descripcion, monto, medio) {
    this.descripcion = descripcion;
    this.monto = monto;
    this.medio = medio;
  }
}

btnCargar.addEventListener("click", capturar);
result.addEventListener("click", calculo);

function capturar() {
  let medios = document.getElementById("opcionesMedios");
  let medio = medios.value;
  let monto = document.getElementById("Monto").value;
  let descripcion = document.getElementById("Descripcion").value;

  nuevoGasto = new Gasto(descripcion, monto, medio);
  listaGastos.push(nuevoGasto);

  const liText = `
    <li class="list-group-item d-flex justify-content-between align-items-start">
    <div class="ms-2 me-auto">
    <div class="fw-bold">${descripcion}</div>
    ${medio}
    </div>
    <span class="badge rounded-pill bg-primary">$${monto}</span>
    </li>
    `;

  let liSet = document.createElement("li");
  liSet.innerHTML = liText;
  olInsert.append(liSet);
}

function calculo() {
  let gastosEnEfectivo = listaGastos.filter((gas) => gas.medio == "Efectivo");
  let gastosEnDebito = listaGastos.filter((gas) => gas.medio == "Debito");
  let gastosEnCredito = listaGastos.filter((gas) => gas.medio == "Tarjetas");

  let totalefe = gastosEnEfectivo.reduce(
    (acumulado, sig) => acumulado + parseInt(sig.monto),
    0
  );
  let totaldeb = gastosEnDebito.reduce(
    (acumulado, sig) => acumulado + parseInt(sig.monto),
    0
  );
  let totaltarj = gastosEnCredito.reduce(
    (acumulado, sig) => acumulado + parseInt(sig.monto),
    0
  );

  let sumaefe = dispEfectivo - totalefe;
  let sumadeb = dispDebito - totaldeb;
  let sumatarj = dispTarjeta - totaltarj;

  efectivoRES.innerHTML = `Disponible en Tarjeta $${sumaefe}`;
  debitoRES.innerHTML = `Disponible en Tarjeta $${sumadeb}`;
  tarjetasRES.innerHTML = `Disponible en Tarjeta $${sumatarj}`;
}
