import Cl_tienda from "./Cl_tienda.js";
import Dt_tienda from "./Dt_tienda.js";
import Cl_venta from "./Cl_venta.js";
import Dt_ventas from "./Dt_ventas.js";

let tienda = new Cl_tienda(Dt_tienda.montoCaja, Dt_tienda.porcIncremento);

Dt_ventas.forEach((venta) => tienda.agregarVenta(venta.cliente, venta.factura, venta.costo, venta.cnArticulos));

let agregarVenta = () => {
    let cliente = prompt("Ingrese el nombre del cliente");
    let factura = prompt("Ingrese el nro de factura");
    let costo = prompt("Ingrese el costo");
    let cnArticulos = prompt("Ingrese la cantidad de articulos");
    tienda.agregarVenta(cliente, factura, costo, cnArticulos);
    salida2.innerHTML = `<br>Venta añadida con exito`;
}
let modificarVenta = () => {
    let cliente = prompt("Ingrese el nombre del cliente de la venta a modificar");
    let factura = prompt("Ingrese el nuevo nro de factura");
    let costo = prompt("Ingrese el nuevo costo de la venta");
    let cnArticulos = prompt("Ingrese la nueva cantidad de articulos");
    let porcIncremento = null;
    tienda.modificarVenta(cliente, new Cl_venta(cliente, factura, costo, cnArticulos, porcIncremento));
    salida2.innerHTML = `<br>Venta de ${cliente} modificada con exito`;

}
let eliminarVenta = () => {
    let factura = prompt("Ingrese el nro de la factura de la venta a eliminar");
    if(tienda.eliminarVenta(factura))
        salida2.innerHTML = `<br>Venta con factura nro ${factura} fue eliminada con exito`;
    else 
        salida2.innerHTML = `<br>No existe ninguna venta con ese nro de factura`;
}
let clientesMontoMayor = () => {
    let ventas = tienda.clientesMontoMayor();
    salida2.innerHTML = `<br>Clientes que pagaron el monto mayor: `;
    ventas.forEach((venta) => {
        salida2.innerHTML += `${venta.cliente}`
    });
}
let clientesSoloUnArt = () => {
    let ventas = tienda.clientesSoloUnArt();
    if(ventas.length == 0){
        salida2.innerHTML = `<br>No hay clientes que solo llevaron 1 articulo`;
        return;
    }
    salida2.innerHTML = `<br>Clientes que solo se llevaron 1 articulo: `;
    ventas.forEach((venta) => {
        salida2.innerHTML += `${venta.cliente}`
       
    });
}
let listarVentas = () => {
    let ventas = tienda.ventas;
    let salidaTmp = `
    <br><table>
    <tr>
    <th>Cliente</th>
    <th>Factura</th>
    <th>Costo</th>
    <th>Cnt de articulos</th>
    </tr>
    `;
    ventas.forEach((venta) => {
        salidaTmp += `<tr>
        <td>${venta.cliente}</td>
        <td>${venta.factura}</td>
        <td>${venta.costo}</td>
        <td>${venta.cnArticulos}</td>
        </tr>`;
    });
    salidaTmp += `</table>`;
    salida2.innerHTML = salidaTmp;
};

let salida1 = document.getElementById("salida1");
let salida2 = document.getElementById("salida2");
let opciones = document.getElementById("opciones");
salida1.innerHTML = `
Seleccione una de las siguientes opciones:
<br>
<br> 1. Agregar venta (1)
<br> 2. Modificar venta (2)
<br> 3. Eliminar venta. (3)
<br>4. Monto final en caja (4)
<br>5. Clientes que pagaron el monto mayor (5)
<br>6. Clientes que solo se llevaron 1 articulo (6)
<br>7. Listar ventas (7)
`;
opciones.onclick = () => {
    let opcion = +prompt("Seleccione una opcion:")
    switch(opcion) {
        case 1:
            agregarVenta();
            break;
        case 2:
            modificarVenta();
            break;
        case 3:
            eliminarVenta();
            break;
        case 4:
            salida2.innerHTML = `<br>Monto final en caja: $${tienda.montoFinalCaja()}`;
            break;
        case 5:
            clientesMontoMayor();
            break;
        case 6:
            clientesSoloUnArt();
            break;
        case 7:
            listarVentas();
            break;
    }
};