//listado de avistamientos puesto manualmente pq todavia no hay como guardarlos
let avistamientos = [
    {nombreAve:"Condor Andino", tipoAve: "Ave rapaz", lugar: "Putre, Arica y Parinacota",fecha: "2025-03-14", hora: "09:15"},
    {nombreAve:"Picaflor Gigante", tipoAve: "Ave nectarívora", lugar: "San Pedro de Atacama, Antofagasta",fecha: "2025-06-02",hora: "16:40"},
    {nombreAve:"Churrete Costero", tipoAve: "Ave playera", lugar: "Villa Alemana, Valparaíso",fecha: "2024-11-20",hora: "08:05"},
    {nombreAve:"Bandurria",tipoAve: "Ave zancuda",lugar: "Chillán, Ñuble",fecha: "2025-01-08",hora: "18:30"}
];
//filtros
let filtroTipo = "";
let orden = "fecha-asc";
let paginaActual = 1;
const porPagina = 5; //cmostramos 5 avistamientos x pag

const tablaBody= document.getElementById("tabla-body");
const filtroSelect =document.getElementById("filtro-tipo");
const ordenSelect = document.getElementById("orden");
const paginaSpan =document.getElementById("pagina-actual");

//filtro de tipos
function llenarFiltroTipos() {
    const tipos = [...new Set(avistamientos.map(a => a.tipoAve))]; // Set elimina duplicados
    tipos.forEach(tipo => {
        const option = document.createElement("option");
        option.value = tipo;
        option.textContent = tipo;
        filtroSelect.appendChild(option);
    });
}

//aplicar filtro y orden
function obtenerDatosFiltrados(){
    let datos =[...avistamientos];
    if(filtroTipo){
        datos = datos.filter(a => a.tipoAve === filtroTipo);
    }
    //ordenar
    datos.sort((a, b) => {
        if(orden=== "fecha-asc") return new Date(a.fecha) -new Date(b.fecha);
        if(orden=== "fecha-desc") return new Date(b.fecha) -new Date(a.fecha);
        if(orden=== "lugar-asc") return a.lugar.localeCompare(b.lugar);
        if(orden=== "lugar-desc") return b.lugar.localeCompare(a.lugar);
    });
    return datos;
}

//renderizar tabla
function renderizarTabla() {
    const datos= obtenerDatosFiltrados();
    const totalPaginas = Math.ceil(datos.length/porPagina) || 1;
    if (paginaActual > totalPaginas) paginaActual = totalPaginas;
    const inicio = (paginaActual- 1) *porPagina;
    const datosPagina= datos.slice(inicio, inicio +porPagina);
    tablaBody.innerHTML = ""; //limpiar tabla

    datosPagina.forEach(a => {
        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${a.nombreAve}</td>
            <td>${a.tipoAve}</td>
            <td>${a.lugar}</td>
            <td>${a.fecha}</td>
            <td>${a.hora}</td>
        `;
        tablaBody.appendChild(fila);
    });

    paginaSpan.textContent = `Página ${paginaActual} de ${totalPaginas}`;
}

filtroSelect.addEventListener("change", (e) => {
    filtroTipo = e.target.value;
    paginaActual = 1; 
    renderizarTabla();
});
ordenSelect.addEventListener("change", (e) => {
    orden = e.target.value;
    renderizarTabla();
});
document.getElementById("btn-anterior").addEventListener("click", () => {
    if (paginaActual > 1) {
        paginaActual--;
        renderizarTabla();
    }
});
document.getElementById("btn-siguiente").addEventListener("click", () => {
    const datos = obtenerDatosFiltrados();
    const totalPaginas = Math.ceil(datos.length / porPagina);
    if (paginaActual < totalPaginas) {
        paginaActual++;
        renderizarTabla();
    }
});
llenarFiltroTipos();
renderizarTabla();