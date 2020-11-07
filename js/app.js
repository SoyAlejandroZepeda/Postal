//Selectores
const form = document.querySelector('#form');
const contenido = document.querySelector('#contenido');
const entidadSelect = document.querySelector('#entidad');
const municipioSelect = document.querySelector('#municipio');
const localidadSelect = document.querySelector('#localidad');
const postal = document.querySelector('#postal');

//Eventos
leerEventos();
function leerEventos() {
     document.addEventListener('DOMContentLoaded', disOpciones);
     postal.addEventListener('input', leerDatos);
}

//Funciones

//Leer datos de la API
function leerDatos(e) {
     const codigo = e.target.value;
     buscarDatos(codigo);
}

//Deshabilitar opciones de los select
function disOpciones() {
     entidad.disabled = true;
     entidad.classList.add('disabled');

     municipio.disabled = true;
     municipio.classList.add('disabled');

     localidad.disabled = true;
     localidad.classList.add('disabled');
}

//Busqueda de datos en la API
function buscarDatos(postal) {
     const url = `https://api-sepomex.hckdrk.mx/query/info_cp/${postal}?type=simplified`;

     fetch(url)
               .then(datos => datos.json())
               .then(datos => {
                    mostrarDatos(datos.response);
               })
               .catch(function(error) {
                    disOpciones();
                    limpiarEstado();
                    limpiarMunicipio();
                    limpiarLocalidad();
               })

}

//Mostrar datos de la API
function mostrarDatos(datos) { 
     const { estado, municipio, asentamiento } = datos;

     //Obtener coincidencias
     obtenerEstado(estado);
     obtenerMunicipio(municipio);
     obtenerLocalidad(asentamiento);
}

//Validación de estado
function obtenerEstado(estado) {
     //Limpia busqueda anterior
     limpiarEstado();

     const llenado = document.createElement('option');
     llenado.value = estado;
     llenado.textContent = estado;
     entidadSelect.appendChild(llenado);
}

//Validación de municipio
function obtenerMunicipio(municipio) {
     //limpiar busqueda anterior
     limpiarMunicipio();

     const llenado = document.createElement('option');
     llenado.value = municipio;
     llenado.textContent = municipio;
     municipioSelect.appendChild(llenado);
}

//Validación de localidad
function obtenerLocalidad(asentamiento) {
     //Limpia busqueda anterior
     limpiarLocalidad();

     localidadSelect.disabled = false;
     localidadSelect.classList.remove('disabled');

     for(let i = 0; i < asentamiento.length; i++) {
          const llenado = document.createElement('option');
          llenado.value = i;
          llenado.textContent = asentamiento[i];
          localidadSelect.appendChild(llenado);
     }
}

//Limpiar contenido de estado
function limpiarEstado() {
     while(entidadSelect.firstChild) {
          entidadSelect.removeChild(entidadSelect.firstChild);
     }
}

//Limpiar contenido de municipio
function limpiarMunicipio() {
     while(municipioSelect.firstChild) {
          municipioSelect.removeChild(municipioSelect.firstChild);
     }
}

//Limpiar contenido de localidad
function limpiarLocalidad() {
     while(localidadSelect.children[1]) {
          localidadSelect.removeChild(localidadSelect.children[1]);
     }
}